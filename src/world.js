
import {getConfig, getFirstByType, copyObject} from 'helptos';
import Database from 'nedb';

import * as Place from './place';

export let newWorld = (databaseFile) => {

    let state = {};

    state.database = new Database({ filename: databaseFile || 'rpg.db', autoload: true });
    state.world = {
        players: {},
        places: {
            "0,0": Place.newPlace('0,0')
        },
        currentPlace: '0,0',
        currentPlayer: null
    };

    return state.world;
};
