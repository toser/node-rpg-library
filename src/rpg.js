
// this should be the entry point for node-rpg in the near future
// an thus replace index.js
// soon...

import {getConfig, getFirstByType, copyObject} from 'helptos';
import * as Parser from './parser';
import * as World from './world';

export let newRPG = (databaseFile) => {

    let state = {};

    state.world = World.newWorld(databaseFile);
    state.rpg = {
        parse = (command) => { return Parser.parse(command, state.world); }
    };

    // TODO

    return state.rpg;
};
