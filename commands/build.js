const readLastLines = require('read-last-lines');

const cli = require('../cliParser');
const shell = require('../shell');
const log = require('../log');

/**
 * args Map<string, Map>
 */
const run = async (args) => {
    const result = {
        hasRun: false
    };

    // Only run this command is CMD_BUILD in args
    if (cli.CMD_BUILD in args) {
        if (!validate(args)) {
            process.exit(1);
        }

        await start(args);
        result.hasRun = true;
    }
    return result;
}

const start = async (args) => {
    let buildForms = true;
    if (shell.test("-d", `${args[cli.CMD_BUILD].path}/.aem/crx-quickstart`)) {
        buildForms = false;
    }

    if (shell.cmd(`docker compose -f ${args[cli.CMD_BUILD].path}/docker-compose.yml build`, false) !== 0) {
        log.error(`Failed to execute docker compose -f ${args[cli.CMD_BUILD].path}/docker-compose.yml build command`);
        process.exit(1);
    }

    if (shell.cmd(`docker compose -f ${args[cli.CMD_BUILD].path}/docker-compose.yml up -d`) !== 0) {
        log.error(`Failed to execute docker compose -f ${args[cli.CMD_BUILD].path}/docker-compose.yml up command`);
        process.exit(1);
    }

    if (buildForms) {
        while (!shell.test("-e", `${args[cli.CMD_BUILD].path}/.aem/crx-quickstart/logs/error.log`)) {
            log.info("Sleeping - waiting for the error.log file to be created");
            await new Promise(resolve => setTimeout(resolve, 5000));
        }

        log.info("error.log file is created waiting for up message");

        let line = undefined;
        do {
           line = await readLastLines.read(`${args[cli.CMD_BUILD].path}/.aem/crx-quickstart/logs/error.log`, 1000);
           await new Promise(resolve => setTimeout(resolve, 30000));
           log.info("Reading the error.log file looking for startup complete message");
        } while (!line.includes("Application startup completed in"));

        log.info("Application startup completed about to sleep 10 seconds");
        await new Promise(resolve => setTimeout(resolve, 10000));
        log.info("Sleep completed about to stop the container");

        if (shell.cmd(`docker compose -f ${args[cli.CMD_BUILD].path}/docker-compose.yml stop`) !== 0) {
            log.error(`Failed to stop the docker compose -f ${args[cli.CMD_BUILD].path}/docker-compose.yml container`);
            process.exit(1);
        }
        log.info(`Completed the docker compose -f ${args[cli.CMD_BUILD].path}/docker-compose.yml stop command`);

        if (shell.mkdir('-p', `${args[cli.CMD_BUILD].path}/.aem/crx-quickstart/install`) !== 0) {
            log.error(`Failed to create the install folder in the crx-quickstart`);
            process.exit(1);
        }
        log.info("Created the install folder under the crx-quickstart");

        if (shell.cp(undefined, `${args[cli.CMD_BUILD].path}/.aem/aem-forms-addon.far`,`${args[cli.CMD_BUILD].path}/.aem/crx-quickstart/install`) !== 0 )  {
            log.error(`Failed to copy the aem-forms-addon folder in the crx-quickstart`);
            process.exit(1);
        }
        log.info("Copied the AEM Forms Addon Far file to the folder under the crx-quickstart");

        if (shell.cmd(`docker compose -f ${args[cli.CMD_BUILD].path}/docker-compose.yml start`) !== 0) {
            log.error(`Failed to start the docker compose -f ${args[cli.CMD_BUILD].path}/docker-compose.yml container`);
            process.exit(1);
        }
        log.info(`Starting the docker compose -f ${args[cli.CMD_BUILD].path}/docker-compose.yml container`);

        log.info("About to sleep script for 5 minutes while server comes up");
        await new Promise(resolve => setTimeout(resolve, 300000));
        log.info("Script awake now going to stop the docker container")

        if (shell.cmd(`docker compose -f ${args[cli.CMD_BUILD].path}/docker-compose.yml stop`) !== 0) {
            log.error(`Failed to stop the docker compose -f ${args[cli.CMD_BUILD].path}/docker-compose.yml container`);
            process.exit(1);
        }
        log.info(`Completed the docker compose -f ${args[cli.CMD_BUILD].path}/docker-compose.yml stop command`);

        if (shell.cmd(`docker compose -f ${args[cli.CMD_BUILD].path}/docker-compose.yml start`) !== 0) {
            log.error(`Failed to stop the docker compose -f ${args[cli.CMD_BUILD].path}/docker-compose.yml container`);
            process.exit(1);
        }
        log.info(`Completed the docker compose -f ${args[cli.CMD_BUILD].path}/docker-compose.yml start command`);
    }

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
    result = result && aemFormsFarFile(args);
    result = result && javaExists(args);
    result = result && dockerExists(args);

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

const aemFormsFarFile = (args) => {
    if (shell.test("-f", `${args[cli.CMD_BUILD].path}/.aem/aem-forms-addon.far`)) {
        log.info("Found the aem-forms-addon.far file");
        return true;
    } else {
        log.error(`aem-forms-addon.far could not be found in ${args[cli.CMD_BUILD].path}/.aem`);
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

module.exports.run = run;