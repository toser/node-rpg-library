
import {EOL} from 'os';
import * as Help from './commands/help';
import * as Quit from './commands/quit';
import * as Debug from './commands/debug';
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
    Debug,
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

let debug = false,
    disabled = false; // disable parsing

/**
 * parses a given command and executes the according effects in the given world
 * @param {String} command
 * @param {Object} world
 * @return {Array} array of strings containing response messages
 */
export let parse = (player, command, world, write, indicateUserInput) => {

    if (disabled)
        return false; // proceed?

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
        actions.forEach((current, index) => {
            if (typeof current === 'string') {
                // <SIMPLE_MESSAGE_ACTION>
                output.push(current);
                // </SIMPLE_MESSAGE_ACTION>
            } else if (typeof current === 'object') {
                // <OBJECT_ACTION>
                if ('action' in current) {
                    if (current.action === 'message') {
                        setTimeout(() => {
                            write(current.text);
                        }, current.delay || 0);
                    } else if (current.action === 'quit') {
                        output.push('bye');
                        proceed = false;
                    } else if (current.action === 'disable' || current.action === 'enable') {
                        setTimeout(() => {
                            if (current.action === 'disable') {
                                disabled = true;
                                if (debug)
                                    write('DISABLED');
                            } else /* if current.action === 'enable') */ {
                                disabled = false;
                                if (debug)
                                    write('ENABLED');
                                if (indicateUserInput)
                                    indicateUserInput(); // in CLI show '>'
                            }
                        }, current.delay || 0);
                        proceed = false;
                    } else if (current.action === 'debug') {
                        debug = !debug;
                        write('DEBUG', debug ? 'ON' : 'OFF');
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
        });
        if (output.length)
            write(output.join(EOL));
    } else {
        write('unknown command :(');
    }

    if (indicateUserInput && proceed)
        indicateUserInput(); // in CLI show '>'
};
