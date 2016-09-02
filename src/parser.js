
import {EOL} from 'os';
import {flatten, reject, chain} from 'lodash';
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
import * as Leave from './commands/leave';

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
    Leave,
    Open,
    Pick,
    Drop,
    Inventory
];

let debug = false,
    disabled = false; // disable parsing

function isSimpleString(action) {
    return typeof action === 'string';
}

function actionIs(type) {
    return action => {
        return typeof action === 'object' &&
            'action' in action &&
            action.action === type;
    }
}

/**
 * parses a given command and executes the according effects in the given world
 * @param {String} command
 * @param {Object} world
 * @return {Array} array of strings containing response messages
 */
export let parse = (player, command, world, write, indicateUserInput) => {

    //console.log('asd ', _);

    if (disabled)
        return false; // proceed?

    let proceed = true;

    // run each command and get its possible action(s)
    const actions = flatten(
        commands.filter(c => !!c.cmdRegExp) // only commands with a regex
            .filter(c => c.cmdRegExp.test(command)) // only commands that match
            .map(c => c.run(player, command, world)) // run commands
    );

    // string
    const simpleStrings = actions.filter(isSimpleString);
    if(simpleStrings.length) {
        write(simpleStrings.join(EOL));
    }

    // message
    actions.filter(actionIs('message'))
        .forEach(action => {
            setTimeout(() => {
                write(action.text);
            }, action.delay || 0);
        });

    // disable
    actions.filter(actionIs('disable'))
        .forEach(action => {
            setTimeout(() => {
                disabled = true;
                if (debug)
                    write('DISABLED');
            }, action.delay || 0);
            proceed = false;
        });

    // enable
    actions.filter(actionIs('enable'))
        .forEach(action => {
            setTimeout(() => {
                disabled = false;
                if (debug)
                    write('ENABLED');
                if (indicateUserInput)
                    indicateUserInput(); // in CLI show '>'
            }, action.delay || 0);
            proceed = false;
        });

    // quit
    actions.filter(actionIs('quit'))
        .forEach(action => {
            write('bye');
            proceed = false;
        });

    // debug
    actions.filter(actionIs('debug'))
        .forEach(action => {
            debug = !debug;
            write('DEBUG', debug ? 'ON' : 'OFF');
        });

    // fallback
    chain(actions)
        .reject(isSimpleString)
        .reject(actionIs('message'))
        .reject(actionIs('disable'))
        .reject(actionIs('enable'))
        .reject(actionIs('quit'))
        .reject(actionIs('debug'))
        .value()
        .forEach(action => {
            write(JSON.stringify(action, null, 2));
        });

    // command not found
    if(!actions.length) {
        write('unknown command :(');
    }

    if (indicateUserInput && proceed) {
        indicateUserInput(); // in CLI show '>'
    }
};
