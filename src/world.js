
import {getConfig, getFirstByType, copyObject} from 'helptos';
import Database from 'nedb';

import * as Place from './place';
import * as Box from './box';

const newWorld = (databaseFile) => {

    let state = {};

    state.database = new Database({ filename: databaseFile || 'rpg.db', autoload: true });
    state.world = {
        playerGroup: null,
        places: {},
        currentPlace: null,
        getPlayers: n => { return (state.world.playerGroup ? state.world.playerGroup.members.list('name', n) : []); },
        init: () => {
            let spawnLocation = '0,0';
            state.world.places[spawnLocation] = Place.createPlace({ group : state.world.playerGroup });
            state.world.currentPlace = spawnLocation;
        },
        reset: () => {
            state.world.playerGroup = null;
            state.world.places = [];
            state.world.currentPlace = null;
        }
    };

    return state.world;
};

export const createWorld = (databaseFile) => {

    return newWorld(databaseFile);
}
