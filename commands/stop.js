const cli = require('../cliParser');
const shell = require('../shell');
const log = require('../log');


const run = async (args) => {
    const result = {
        hasRun: false
    };
    
    if (cli.CMD_STOP in args) {
        log.info("About to stop the AEM dev environment");

        if (shell.cmd('docker-compose stop') !== 0) {
            log.error("Failed to stop the docker-compose container");
            process.exit(1);
        }
        result.hasRun = true;
    }
    return result;
}

module.exports.run = run;