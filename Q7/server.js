const createScheduler = require('probot-scheduler')
const Stale = require('./stale')
const sleepFor = 24*60*60*1000 //run this daily

console.log('scheduler started...')

module.exports = (robot) => {
  createScheduler(robot, {
    delay: !!process.env.DISABLE_DELAY, // delay is enabled on first run
    interval: sleepFor // 60 secs
  })
  robot.on('schedule.repository', context => {
    const stale = new Stale(context)
    stale.do()
  })
}

