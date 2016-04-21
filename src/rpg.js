
// this should be the entry point for node-rpg in the near future
// an thus replace index.js
// soon...

import {getConfig, getFirstByType, copyObject} from 'helptos';
import * as Parser from './parser';
import * as World from './world';

const newRPG = (databaseFile) => {

    let state = {};

    state.world = World.createWorld(databaseFile);
    state.rpg = {
        parse : (player, command) => { return Parser.parse(player, command, state.world); }
    };

    return state.rpg;
};

export const createRPG = (databaseFile) => {

    let rpg = newRPG(databaseFile);

    return rpg;
}
