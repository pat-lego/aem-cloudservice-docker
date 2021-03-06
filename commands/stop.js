const cli = require('../cliParser');
const shell = require('../shell');
const log = require('../log');


const run = async (args) => {
    const result = {
        hasRun: false
    };

    if (cli.CMD_STOP in args) {
        log.info("About to stop the AEM dev environment");

        process.env.AEM_FONTS_DIR = fontsDir(args[cli.CMD_STOP].path);
        process.env.AEM_LOGS_DIR = logsDir(args[cli.CMD_STOP].path);

        if (shell.cmd(`docker compose -f ${args[cli.CMD_STOP].path}/docker-compose.yml stop`) !== 0) {
            log.error("Failed to stop the docker compose container");
            process.exit(1);
        }
        result.hasRun = true;
    }
    return result;
}

const fontsDir = (path) => {
    return `${path}/.aem/crx-quickstart/fonts`;
}

const logsDir = (path) => {
    return `${path}/.aem/crx-quickstart/logs`;
}

module.exports.run = run;