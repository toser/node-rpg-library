import {EventEmitter} from 'events';
import {getConfig, copyObject} from 'helptos';
import {randomInt} from 'random-tools';
import * as properties from './properties';
import * as box from './box';
import {createName} from './name';

const config = getConfig('../config/place.json', __dirname);

const name = state => Object.assign({}, properties.mixed('name', state, state));
const placeNames = getConfig('../config/names/place-names.json', __dirname);


const boxes = state => Object.assign({},
    // get default list functionality
    properties.list(
        'boxes',
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
            boxes: place.boxes.list().map(box => box.summary.short())
        };
    },
    short: () => state.element.name.get(),
    boxes: {
        get: () => state.element.boxes.list().map(box => box.summary.get()),
        short: () => state.element.boxes.list().map(box => box.summary.short())
    },
    groups: {
        get: () => state.element.groups.list().map(group => group.summary.get()),
        short: () => state.element.groups.list().map(group => group.summary.short())
    }
});

const newPlace = (name_in) => {

    let state = copyObject(config);

    state.name = name_in;

    state.element = {
        name: name(state),
        boxes: boxes(state),
        groups: groups(state),
        summary: summary(state),
        event: new EventEmitter()
    };

    return state.element;
};

export const createPlace = ({group, name = createName(placeNames)}) => {

    let place = newPlace(name),
        numberOfBoxes = randomInt(10, 1),
        numberOfEnemyGroups = randomInt(4, 1);

    console.log(numberOfBoxes);

    let a = box.createBoxes({average: group.info.average()}, numberOfBoxes);

    console.log(a);

    place.boxes.add(box.createBoxes({average: group.info.average()}, numberOfBoxes))
        .groups.add(group);



    return place;
}
