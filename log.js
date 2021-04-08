const chalk = require('chalk');
const log = console.log;

const info = (msg) => {
    if (msg) {
        log(chalk.blue(msg));
    }
}

const warn = (msg) => {
    if (msg) {
        log(chalk.yellow(msg));
    }
}

const error = (msg) => {
    if (msg) {
        log(chalk.red(msg));
    }
}

module.exports.info = info;
module.exports.warn = warn;
module.exports.error = error;