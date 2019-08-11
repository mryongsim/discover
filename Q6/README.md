# Q6. Write a Cookbook/Playbook to host a simple application server with above build artifacts (Question 2).

## assumption:
1. There is an ansible tower running with a template for deployment. 
2. It has the credentials for the ansible vault and the ssh key

# Runbook
Run the followign steps to perform the deployment:
1. Connect to ansible tower and start the template 'Deploy Artifact And Run'
2. Enter the following parameter when prompted:
    - groupId - the group ID of the java project
    - artifact - the artifact to deploy
    - version - the version to deploy
    - packaging (Optional) - default to Jar if not provided
3. Execute the deployment.
