# Task: Q1. Setup Jenkins Master/Agents stack on Kubernetes/Docker Swarm.

 1. Setup Kubernetes
 2. Setup Jenkins using kubctl
    ```
    kubectl create -f q1-jenkins.yaml 
    ```
 3. Setup the account:
    ```
    kubectl create clusterrolebinding permissive-binding --clusterrole=cluster-admin --user=admin --user=kubelet --group=system:serviceaccount
    ```
 4. In Jenkins, setup the Kubernetes plugin, with a label for the slaves if you wish
 5. Run agains slave using the label

 alternative is to use [helm](https://github.com/helm/charts/tree/master/stable/jenkins)


