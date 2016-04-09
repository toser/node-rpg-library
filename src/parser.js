
import * as Help from './commands/help';
import * as Quit from './commands/quit';

const commands = [
    Help,
    Quit
];

/**
 * parses a given command and executes the according effects in the given world
 * @param {String} command
 * @param {Object} world
 * @return {Array} array of strings containing response messages
 */
export let parse = (player, command, world) => {

    let output = [];

    for (let cmd in commands) {
        let regExp = commands[cmd].cmdRegExp || null;
        if (regExp && regExp.test(command)) {
            let res = commands[cmd].run(player, command, world);
            output = output.concat(res);
        }
    }

    if (output.length === 0)
        return [ 'unknown command :(' ];

    return output;
};
