const commander = require('commander');

const CMD_BUILD = "build";
const CMD_STOP = "stop";
const cliArgs = {};

const parse = (argv) => {
    const commandPalette = new commander.Command();

    commandPalette
        .addCommand(buildCmd())
        .addCommand(stopCmd());

    commandPalette.parse();
    return cliArgs;
}

const buildCmd = () => {
    const build = new commander.Command(CMD_BUILD);
    build
        .description("Builds the AEM Cloud instance instance")
        .option("-p, --path <type>", "Path to the .aem folder", "./")
        .option("-k, --key <type>", "Key path for AEM", "./" )
        .action((command) => {
            cliArgs[CMD_BUILD] = command;
        });
    return build;
}

const stopCmd = () => {
    const stop = new commander.Command(CMD_STOP);
    stop
        .description("Stops the AEM Cloud instance instance")
        .option("-p, --path <type>", "Path to the .aem folder", "./")
        .action((command) => {
            cliArgs[CMD_STOP] = command;
        });
    return stop;
}

module.exports.parse = parse;
module.exports.CMD_BUILD = CMD_BUILD;
module.exports.CMD_STOP = CMD_STOP;