FROM eclipse-temurin:11-jre

ENV APP_HOME=/usr/src/app
WORKDIR $APP_HOME

EXPOSE 8080

COPY target/*.jar app.jar

CMD ["java", "-jar", "app.jar"]
