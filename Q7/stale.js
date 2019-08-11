
module.exports = class Stale {
  constructor (context) {
    // Aliases
    this.github = context.github
    this.repo = context.payload.repository.name
    this.owner = context.payload.repository.owner.login
    this.repoFullName = context.payload.repository.full_name
    this.staleDays = 10
    this.closeDays = 7
    this.staleLabel = 'stale'
    this.markStaleComment = `Marking this issue as stale due to inactivity for ${this.staleDays} days`
    this.markCloseComment = `Closed as this has been marked as ${this.staleLabel} for ${this.closeDays} days`
  }

  // called by scheduler
  do () {
    this.doStale()
    this.doClose()
    //const staleItems = (await this.getStale()).data.items
    //console.log("stale issue found: %d", staleItems.length)
    
  }
  
  // mark these as stale
  // as they are older than stale date but have not been marked as stale. 
  // only do the ones that are open
  async doStale() {
    const query = "-label:stale"
    
    const status = {
       state: "open",
       labels: [this.staleLabel],
       comment: this.markStaleComment
    }
    const numStale = (await this.doWork(query, this.closeDays, status))
    
    console.log(`${numStale} issues/pulled requests marked as stale due to inactivity`)
    
  }
  
  // Mark stale items as closed if it's been stale for too long
  async doClose() {
    const query = "label:stale"
    const status = {
       state: "closed",
       labels: [],
       comment: this.markCloseComment
    }
    
    const numClosed = (await this.doWork(query, this.closeDays, status))
    
    console.log(`${numClosed} stale issues/pulled requests closed`)
  }
  
  // do the actual dirty work of looking for issues/pull requests 
  // and marking them for stale or close
  async doWork(query, daysAgo, status) {
    
    const items = (await this.search(daysAgo, query)).data.items
    
    await Promise.all(
      items
        .map(issue => {
          //console.log(issue.number)
          //console.log(status)
          return this.mark(issue, status)
        })
    )
    
    return items.length
  }
  
  
  // calculate and return the number of day from now.
  // dow it at a day level
  since (days) {
    const numdays = (days * 24 * 60 * 60 * 1000)
    let date = new Date(new Date() - numdays)

    // GitHub won't allow it
    if (date < new Date(0)) {
      date = new Date(0)
    }
    
    return date
  }

  // do the search on github based on the query we passed in
  // only looking at our repo + any open issues
  search (days, query) {
    const timestamp = this.since(days)
      .toISOString()
      .replace(/\.\d{3}\w$/, '')
    
    query = `repo:${this.repoFullName} is:open updated:<${timestamp} ${query}`

    const params = {
      q: query,
      sort: 'updated',
      order: 'desc'
    }
    
    return this.github.search.issuesAndPullRequests(params)
    
  }
  
  // mark for whatever status is passed in
  async mark (issue, status) {
    const number = issue.number

    console.log('%s #%d is being marked', this.repoFullName, number)
    
    const labels = issue.labels.concat(status.labels)
    
    console.log(status)
    await this.github.issues.createComment({
        owner: this.owner,
        repo: this.repo,
        issue_number: number,
        body: status.comment
    })
    
      
    return this.github.issues.update({
        owner: this.owner,
        repo: this.repo,
        issue_number: number,
        state: status.state,
        labels: labels
    })
  }

}