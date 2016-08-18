
import * as Help from './commands/help';
import * as Quit from './commands/quit';
import * as Start from './commands/start';
import * as Stop from './commands/stop';
import * as Group from './commands/group';
import * as Player from './commands/character';
import * as Where from './commands/where';
import * as Boxes from './commands/boxes';
import * as Move from './commands/move';
import * as Pick from './commands/pickup';
import * as Inventory from './commands/inventory';

const commands = [
    //
    Help,
    Quit,
    Start,
    Stop,
    //
    Group,
    Player,
    Where,
    Boxes,
    //
    Move,
    Pick,
    Inventory
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
