const log = require('./log');

const parser = require('./cliParser');
const commands = require('./commands/commands');

log.info("Starting CLI for Docker AEM Forms as a Cloud Service");

log.info("Parsing the CLI parameters")
const args = parser.parse(process.argv);
log.info("Successfully parsed the CLI args");

commands.build.run(args);