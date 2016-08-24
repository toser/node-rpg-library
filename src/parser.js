
import {EOL} from 'os';
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
import * as Drop from './commands/drop';
import * as Inventory from './commands/inventory';
import * as Open from './commands/open';

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
    Open,
    Pick,
    Drop,
    Inventory
];

/**
 * parses a given command and executes the according effects in the given world
 * @param {String} command
 * @param {Object} world
 * @return {Array} array of strings containing response messages
 */
export let parse = (player, command, world, write) => {

    let proceed = true,
        actions = [];

    // run each command and get its possible action(s)
    for (let cmd in commands) {
        let regExp = commands[cmd].cmdRegExp || null;
        if (regExp && regExp.test(command)) {
            let res = commands[cmd].run(player, command, world);
            actions = actions.concat(res);
        }
    }

    // check the actions & act accordingly
    if (actions.length) {
        let output = [];
        proceed = actions.every((current, index) => {
            if (typeof current === 'string') {
                // <SIMPLE_MESSAGE_ACTION>
                output.push(current);
                // </SIMPLE_MESSAGE_ACTION>
            } else if (typeof current === 'object') {
                // <OBJECT_ACTION>
                if ('action' in current) {
                    let action = current.action;
                    if (action === 'quit') {
                        output.push('bye');
                        return false;
                    } else {
                        output.push('unknown action :(');
                    }
                } else {
                    output.push(JSON.stringify(current, null, 2));
                }
                // </OBJECT_ACTION>
            } else {
                // <UNKNOWN_ACTION>
                output.push('unknown action type :(');
                // </UNKNOWN_ACTION>
            }
            return true;
        });
        if (output.length)
            write(output.join(EOL));
    } else {
        write('unknown command :(');
    }

    return !proceed;
};
