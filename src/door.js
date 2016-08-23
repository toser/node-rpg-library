import {getConfig, copyObject} from 'helptos';
import {randomInt} from 'random-tools';
import * as properties from './properties';
import {createName} from './name';

const config = getConfig('../config/door.json', __dirname);
const doorNames = getConfig('../config/names/door-names.json', __dirname);

const name = state => Object.assign({}, properties.mixed('name', state));
const open = state => Object.assign({}, properties.boolean('open', state));
const path = state => Object.assign({}, properties.mixed('path', state));

const summary = state => ({

    get: () => {
        const door = state.element;

        return {
            name: door.name.get(),
            open: door.open.get(),
            path: door.path.get()
        };
    },
    short: () => {
        const door = state.element;

        return {
            name: door.name.get(),
            open: door.open.get()
        };
    }
});

const newDoor = (doorName) => {

    let state = copyObject(config);

    state.name = doorName;

    state.element = {
        name: name(state),
        open: open(state),
        path: path(state),
        summary: summary(state)
    };

    return state.element;
};

export const createDoor = ({name = createName(doorNames)}) => {

    let door = newDoor(name);

    return door;
};

export const createDoors = (options, count) => {

    let i = 0,
        doors = [];

    for (i; i < count; i++) {
        doors.push(createDoor(options));
    }

    return doors;
};