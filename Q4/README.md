Q4. Create a Container(Docker) image that contains an application server with above build artifacts.

1. Create a directory to host the Dockerfile
2. Download a copy of the jar
```
curl -u user:pass -o SimpleProject-0.0.1.jar http://host:8081/nexus/content/repositories/snapshots/com/sim...
```
3. Build
```
docker build -t simpleproject .
```
```
 ...
 Successfully tagged simpleproject:latest
```