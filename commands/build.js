const cli = require('../cliParser');
const shell = require('../shell');
const log = require('../log');

/**
 * args Map<string, Map>
 */
run = (args) => {
    if (!validate(args)) {
        process.exit(1);
    }

    start(args);

}

const start = (args) => {
 
}

/**
 * Returns true or false determining if everything that is required as part of the installation is present
 * @param {Map<string, Map>} 
 * @returns {boolean} True if all requirements are met to execute the run command, Falso otherwise
 */
const validate = (args) => {
    let result = true;
    result = result && aemFolderExists(args);
    result = result && aemJarExists(args);
    result = result && aemLicenseFile(args);
    result = result && javaExists(args);
    result = result && dockerExists(args);
    result = result && dockerComposeExists(args);

    return result;
}

const aemFolderExists = (args) => {
    if (shell.test("-e", `${args[cli.CMD_BUILD].path}/.aem`)) {
        log.info("Found the .aem folder");
        return true;
    } else {
        log.error(`.aem folder could not be found in ${args[cli.CMD_BUILD].path}`);
        return false;
    }
}

const aemJarExists = (args) => {
    if (shell.test("-f", `${args[cli.CMD_BUILD].path}/.aem/aem-sdk-quickstart.jar`)) {
        log.info("Found the aem-sdk-quickstart.jar jar file");
        return true;
    } else {
        log.error(`aem-sdk-quickstart.jar could not be found in ${args[cli.CMD_BUILD].path}/.aem`);
        return false;
    }
}

const aemLicenseFile = (args) => {
    if (shell.test("-f", `${args[cli.CMD_BUILD].path}/.aem/license.properties`)) {
        log.info("Found the license.properties license file");
        return true;
    } else {
        log.error(`license.properties could not be found in ${args[cli.CMD_BUILD].path}/.aem`);
        return false;
    }
}

const javaExists = (args) => {
    if (shell.which('java')) {
        log.info("Java was successfully located");
        return true;
    } else {
        log.error("Java was not located on the machine");
        return false;
    }
}

const dockerExists = (args) => {
    if (shell.which('docker')) {
        log.info("Docker was successfully located");
        return true;
    } else {
        log.error("Docker was not located on the machine");
        return false;
    }
}

const dockerComposeExists = (args) => {
    if (shell.which('docker-compose')) {
        log.info("docker-compose was successfully located");
        return true;
    } else {
        log.error("docker-compose was not located on the machine");
        return false;
    }
}

module.exports.run = run;