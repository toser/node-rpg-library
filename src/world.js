
import {getConfig, getFirstByType, copyObject} from 'helptos';
import Database from 'nedb';

import * as Place from './place';

export let newWorld = (databaseFile) => {

    let state = {};

    state.database = new Database({ filename: databaseFile || 'rpg.db', autoload: true });
    state.world = {
        playerGroup: null,
        getPlayers: function(n) { return (state.world.playerGroup ? state.world.playerGroup.members.list('name', n) : []); },
        places: {
            "0,0": Place.newPlace('0,0')
        },
        currentPlace: '0,0'
    };

    return state.world;
};
