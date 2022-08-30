FROM gradle:7.5.1-jdk11  as build-stage
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp
RUN gradle build


FROM openjdk:11 as production-stage
COPY --from=build-stage /usr/src/myapp/build/libs/*.jar /usr/src/myapp/app.jar
ENTRYPOINT ["java","-jar","/usr/src/myapp/app.jar"]