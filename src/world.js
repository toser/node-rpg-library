
import {getConfig, getFirstByType, copyObject} from 'helptos';
import Database from 'nedb';

import * as Place from './place';
import * as Box from './box';

export let newWorld = (databaseFile) => {

    let state = {},
        spawnPlace = Place.newPlace('0,0');

    state.database = new Database({ filename: databaseFile || 'rpg.db', autoload: true });
    state.world = {
        playerGroup: null,
        getPlayers: function(n) { return (state.world.playerGroup ? state.world.playerGroup.members.list('name', n) : []); },
        places: {
            "0,0": spawnPlace
        },
        currentPlace: '0,0'
    };

    //TODO: remove when done... (:
    spawnPlace.boxes.add(Box.createBox());

    return state.world;
};
