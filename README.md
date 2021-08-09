# AEM CloudService Docker

This script automates the creation of an AEM Forms as a Cloud Service instance.

## What to install

1. [Docker](https://docs.docker.com/get-docker/)
  - Docker version 20.10.7, build f0df350 
2. [Node & NPM](https://nodejs.org/en/download/)
  - Tested against v12.22.1
3. Java
  - Use a supported AEM version

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
  - **Note:** To delete the image users must execute `docker image rm [image_id]` which the `image_id` can be located from the `docker images` command
5. Run a `npm install`
6. Run `node index.js build`
  - Optionally you can specify the location of the AEM folder using the -p option

# Encapsulated Token Support

In order to prevent the core system keys from being overwritten at runtime it is important to follow the article documented [here](https://experienceleague.adobe.com/docs/experience-manager-65/administering/security/encapsulated-token.html?lang=en) this will allow to have the same key with every build.

## Contributor

[Patrique Legault](https://github.com/pat-lego)