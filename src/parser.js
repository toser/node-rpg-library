
import {EOL} from 'os';
import {chain} from 'lodash';
import * as Help from './commands/help';
import * as Quit from './commands/quit';
import * as Debug from './commands/debug';
import * as Start from './commands/start';
import * as Stop from './commands/stop';
import * as Group from './commands/group';
import * as Player from './commands/character';
import * as Where from './commands/where';
import * as Boxes from './commands/boxes';
import * as Doors from './commands/doors';
import * as Creatures from './commands/creatures';
import * as Move from './commands/move';
import * as Pick from './commands/pickup';
import * as Drop from './commands/drop';
import * as Inventory from './commands/inventory';
import * as Open from './commands/open';
import * as Leave from './commands/leave';
import * as Attack from './commands/attack';

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
    Doors,
    Creatures,
    //
    Move,
    Leave,
    Open,
    Pick,
    Drop,
    Attack,
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

function commandMatches(command) {
    return c => !!c.cmdRegExp && c.cmdRegExp.test(command);
}

function runCommand(player, command, world) {
    return c => c.run(player, command, world);
}

/**
 * parses a given command and executes the according effects in the given world
 * @param {String} command
 * @param {Object} world
 * @return {Array} array of strings containing response messages
 */
export let parse = (player, command, world, write, indicateUserInput) => {

    if (disabled)
        return false; // proceed?

    let proceed = true;

    const actions = chain(commands)
        .filter(commandMatches(command))
        .flatMap(runCommand(player, command, world))
        .value();

    // string
    const simpleStrings = actions.filter(isSimpleString);
    if(simpleStrings.length) {
        write(simpleStrings.join(EOL));
    }

    // message
    actions.filter(actionIs('message'))
        .forEach(action => {
            let delay = action.delay;
            if (debug) {
                delay = 0;
            }
            setTimeout(() => {
                write(action.text);
            }, delay || 0);
        });

    // delay
    actions.filter(actionIs('delay'))
        .forEach(action => {
            let delay = action.delay;
            if (debug) {
                delay = 0;
            }
            setTimeout(() => {
                action.callback();
            }, delay || 0);
        });

    // disable
    actions.filter(actionIs('disable'))
        .forEach(action => {
            let delay = action.delay;
            if (debug) {
                delay = 0;
            }
            setTimeout(() => {
                disabled = true;
                if (debug)
                    write('DISABLED');
            }, delay || 0);
            proceed = false;
        });

    // enable
    actions.filter(actionIs('enable'))
        .forEach(action => {
            let delay = action.delay;
            if (debug) {
                delay = 0;
            }
            setTimeout(() => {
                disabled = false;
                if (debug)
                    write('ENABLED');
                if (indicateUserInput)
                    indicateUserInput(); // in CLI show '>'
            }, delay || 0);
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
        .reject(action => {
            return isSimpleString(action) ||
                actionIs('message')(action) ||
                actionIs('delay')(action) ||
                actionIs('disable')(action) ||
                actionIs('enable')(action) ||
                actionIs('quit')(action) ||
                actionIs('debug')(action);
        })
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
