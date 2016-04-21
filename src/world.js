
import {getConfig, getFirstByType, copyObject} from 'helptos';
import Database from 'nedb';

import * as Place from './place';
import * as Box from './box';

const newWorld = (databaseFile) => {

    let state = {};

    state.database = new Database({ filename: databaseFile || 'rpg.db', autoload: true });
    state.world = {
        playerGroup: null,
        getPlayers: function(n) { return (state.world.playerGroup ? state.world.playerGroup.members.list('name', n) : []); },
        places: {},
        currentPlace: null
    };

    return state.world;
};

export const createWorld = (databaseFile) => {

    let world = newWorld(databaseFile),
        spawnLocation = '0,0',
        spawnPlace = Place.createPlace(spawnLocation);

    world.places[spawnLocation] = spawnPlace;
    world.currentPlace = spawnLocation;

    //TODO: remove when done... (:
    spawnPlace.boxes.add(Box.createBox());

    return world;
}
