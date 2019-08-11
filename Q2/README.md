# Q2. Write a Jenkins pipeline to perform static code analysis(Ex Sonarqube) on Pull Requests/Code Reviews?

This requires the setup of the plugin 
1. ON Github -> Add a webhook http://jenkins.host/ghprbhook/ (for pull)
2. ON Jenkins -> Install and and configure GitHub Pull Request Builder
3. On Jenkins -> Create pipeline using GitHub Pull Request Builder + the pipeline code below
4. Add sonar-project.properties to the project root

note: Other consideration is to use Jenkins GitHub Branch Source plugin if I have an organisation