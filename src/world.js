
import {getConfig, getFirstByType, copyObject} from 'helptos';
import {randomInt} from 'random-tools';
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
            let spawnLocation = newLocation(state.world);
            state.world.places[spawnLocation] = Place.createPlace({ group : state.world.playerGroup });
            state.world.currentPlace = spawnLocation;
            state.world.places[spawnLocation].location.set(spawnLocation);
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

// ToDo: we should do this better
export const newLocation = (world, location) => {

    if(!location) {
        return '0,0';
    }

    const currX = parseInt(location.split(',')[0]),
        currY = parseInt(location.split(',')[1]),
        x = randomInt(currX+1, currX-1),
        y = randomInt(currY+1, currY-1);

    if(!world.places[`${x},${y}`]) {
        return `${x},${y}`;
    }

    return newLocation(world, `${x},${y}`);
};
