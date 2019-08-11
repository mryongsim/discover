# base image of Java
FROM java:8

# Set the version env var
ENV APP_VER 0.0.1

# copy jar into image
WORKDIR /
COPY SimpleProject-${APP_VER}.jar SimpleProject.jar

# run application with this command line
CMD java -jar SimpleProject.jar