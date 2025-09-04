FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -B -q -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -B -DskipTests clean package

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
ENV SERVER_PORT=8080 PASSWORD_MIN_LENGTH=6 PASSWORD_SUFFIX=123 CORS_ALLOWED_ORIGINS=http://localhost:4200
COPY --from=build /app/target/tp-backend-0.0.1-SNAPSHOT.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
