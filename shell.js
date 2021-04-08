const shell = require('shelljs');

/**
 * Determine is the desired utility is available on the local system
 * @param {string} utility - The name of the utility on the system
 * @returns {boolean} Found the utility or not
 * 
 * @example
 *          isInstalled('docker-compose')
 */
 const isInstalled = (utility) => {
    if (!utility) {
        throw Error('Must provide a utility to check for on the local operating system');
    }
    
    if(!shell.which(utility)) {
        return false;
    }
    return true;
}

/**
 * Perform a command (cmd) using the shell
 * @param {string} cmd The command to execute
 * @param {boolean} reset Reset the state of the shell
 * 
 * @returns {number} representing the exit code of the command
 */
const exec = (cmd, reset) => {
    if (reset === true) {
        shell.config.reset();
    }

    return shell.exec(cmd).code;
}

/**
 * Available expression primaries:
 *
 * Available expression primaries:
 *
 * '-b', 'path': true if path is a block device
 * '-c', 'path': true if path is a character device
 * '-d', 'path': true if path is a directory
 * '-e', 'path': true if path exists
 * '-f', 'path': true if path is a regular file
 * '-L', 'path': true if path is a symbolic link
 * '-p', 'path': true if path is a pipe (FIFO)
 * '-S', 'path': true if path is a socket
 * @param {string} arg 
 * @param {string} path 
 * @returns {boolean}
 */
const test = (arg, path) => {
    return shell.test(arg, path);
}

/**
 * Create a a folder in a designated path
 * @param {string} arg -p Create intermediate directories
 * @param {string[]} paths An array of paths
 * 
 * @returns {number} Exit code of the mkdir
 */
const mkdir = (arg, paths) => {
    if (arg) {
        return shell.mkdir(arg, paths).code;
    } else {
        return shell.mkdir(paths).code;
    }
}

const cp = (arg, from, to) => {
    if (arg) {
        return shell.cp(arg, from, to).code;
    } else {
        return shell.cp(from, to).code;
    }
}

module.exports.which = isInstalled;
module.exports.cmd = exec;
module.exports.mkdir = mkdir;
module.exports.cp = cp;
module.exports.test = test;