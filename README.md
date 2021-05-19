# AEM CloudService Docker

This script automates the creation of an AEM Forms as a Cloud Service instance.

## How to run

1. Create a folder under this project called .aem
2. Place the following underneath it 
  - license.properties file
  - aem-forms-addon.far
  - aem-sdk-quickstart.jar
3. Make sure you have the following installed on your computer
  - NodeJS
  - Java
  - Docker version 20.10.6+
4. Load the Output image into the docker registry
  - Unzip the forms add on 
  - Unzip the forms-addon-native
  - Run `docker load < formsdocservice-native-sdk-${version}.tar.gz`
5. Run a `npm install`
6. Run `node index.js build`
  - Optionally you can specify the location of the AEM folder using the -p option

## Contributor

[Patrique Legault](https://github.com/pat-lego)