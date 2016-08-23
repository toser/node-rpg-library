import {EventEmitter} from 'events';
import {getConfig, copyObject} from 'helptos';
import {randomInt} from 'random-tools';
import * as properties from './properties';
import * as box from './box';
import * as door from './door';
import {createName} from './name';

const config = getConfig('../config/place.json', __dirname);
const placeNames = getConfig('../config/names/place-names.json', __dirname);

const name = state => Object.assign({}, properties.mixed('name', state, state));
const explored = state => Object.assign({}, properties.boolean('explored', state, state));

const boxes = state => Object.assign({},
    // get default list functionality
    properties.list(
        'boxes',
        state
    )
);

const doors = state => Object.assign({},
    // get default list functionality
    properties.list(
        'doors',
        state
    )
);

const groups = state => Object.assign({},
    // get default list functionality
    properties.list(
        'groups',
        state
    )
);

const summary = state => ({

    get: () => {
        const place = state.element;

        return {
            name: place.name.get(),
            groups: place.groups.list().map(group => group.summary.short()),
            boxes: place.boxes.list().map(box => box.summary.short()),
            doors: place.doors.list().map(door => door.summary.short())
        };
    },
    short: () => state.element.name.get(),
    boxes: {
        get: () => state.element.boxes.list().map(box => box.summary.get()),
        short: () => state.element.boxes.list().map(box => box.summary.short())
    },
    doors: {
        get: () => state.element.doors.list().map(door => door.summary.get()),
        short: () => state.element.doors.list().map(door => door.summary.short())
    },
    groups: {
        get: () => state.element.groups.list().map(group => group.summary.get()),
        short: () => state.element.groups.list().map(group => group.summary.short())
    }
});

const newPlace = (state_in) => {

    let state = Object.assign(copyObject(config), state_in);

    //state.name = name_in;

    state.element = {
        name: name(state),
        explored: explored(state),
        boxes: boxes(state),
        doors: doors(state),
        groups: groups(state),
        summary: summary(state),
        event: new EventEmitter()
    };

    return state.element;
};

export const createPlace = ({ group, path, name}) => {

    let place = newPlace({
            name: name || createName(placeNames)
        }),
        numberOfBoxes = randomInt(10, 1),
        numberOfEnemyGroups = randomInt(4, 1),
        numberOfDoors = randomInt(4,1);

    place.doors.add(door.createDoors({}, numberOfDoors));

    if(group) {
        place.boxes.add(box.createBoxes({average: group.info.average()}, numberOfBoxes))
            .groups.add(group);
    }

    if(path && place.doors.list().length) {
        place.doors.list()[0].path.add(path);
    }


    return place;
}
