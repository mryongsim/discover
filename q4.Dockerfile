# Q4. Create a Container(Docker) image that contains an application server with above build artifacts.
# 1. Create a directory to host the Dockerfile
# 2. Download a copy of the jar
# curl -u user:pass -o SimpleProject-0.0.1.jar http://host:8081/nexus/content/repositories/snapshots/com/sim...
# 3. Build
# docker build -t simpleproject .
# ...
# Successfully tagged simpleproject:latest

# base image of Java
FROM java:8

# Set the version env var
ENV APP_VER 0.0.1

# copy jar into image
WORKDIR /
COPY SimpleProject-${APP_VER}.jar SimpleProject.jar

# run application with this command line
CMD java -jar SimpleProject.jar