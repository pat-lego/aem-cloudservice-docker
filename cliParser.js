const commander = require('commander');

const CMD_BUILD = "build";
const cliArgs = {};

const parse = (argv) => {
    const commandPalette = new commander.Command();

    commandPalette.addCommand(buildCmd());

    commandPalette.parse();
    return cliArgs;
}

const buildCmd = () => {
    const build = new commander.Command(CMD_BUILD);
    build
        .description("Builds the AEM Cloud instance instance")
        .option("-p, --path <type>", "Path to the .aem folder", "./")
        .action((command) => {
            cliArgs[CMD_BUILD] = command;
        });
    return build;
}

module.exports.parse = parse;
module.exports.CMD_BUILD = CMD_BUILD;