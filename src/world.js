
import {getConfig, getFirstByType, copyObject} from 'helptos';
import Database from 'nedb';

export let newWorld = (databaseFile) => {

    let state = {};

    state.database = new Database({ filename: databaseFile || 'rpg.db', autoload: true });
    state.world = {
        //TODO
    };

    return state.world;
};
