FROM openjdk:11.0.10-jdk

WORKDIR /opt/adobe/aem
EXPOSE 4502 8000
CMD java -Djava.awt.headless=true -Xdebug -Xnoagent -Xmx5120m -agentlib:jdwp=transport=dt_socket,address=*:8000,server=y,suspend=n -jar aem-sdk-quickstart.jar -p 4502 -r nosamplecontent,local -v 