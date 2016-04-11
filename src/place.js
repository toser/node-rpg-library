import {getConfig, copyObject} from 'helptos';
import * as properties from './properties';

const config = getConfig('../config/place.json', __dirname);

const name = state => Object.assign({}, properties.mixed('name', state, state));


const boxes = state => ({

    list: () => state.boxes,
    add: () => {

        // ToDo: add box

        return state.element;
    },
    remove: () => {


        // ToDo: remove box

        return state.element;
    }

});

const teams = state => ({

    list: () => state.teams,
    add: () => {

        // ToDo: add team

        return state.element;
    },
    remove: () => {


        // ToDo: remove team

        return state.element;
    }

});

export const newPlace = (name) => {

    let state = copyObject(config);

    state.name = name;

    state.element = {
        name: name(state),
        boxes: boxes(state),
        teams: teams(state)
    };

    return state.element;
};