import {EventEmitter} from 'events';
import {getConfig, copyObject} from 'helptos';
import {randomInt} from 'random-tools';
import {createName} from './name';
import * as properties from './properties';
import * as item from './item';

const config = getConfig('../config/box.json', __dirname);
const boxNames = getConfig('../config/names/box-names.json', __dirname);

const name = state => Object.assign({}, properties.mixed('name', state, state));
const open = state => Object.assign({}, properties.boolean('open', state, state));

const items = state => Object.assign({},
    // get default list functionality
    properties.list(
        'items',
        state,
        state,
        [
            item.types.WEAPON,
            item.types.ARMOR,
            item.types.CONSUMABLE
        ]
    )
);

const summary = state => ({

    get: () => {

        const box = state.element;

        return {
            name: box.name.get(),
            open: box.open.get(),
            items: box.items.list().map(item => item.summary.short())
        };
    },
    short: () => {

        const box = state.element;

        return {
            name: box.name.get(),
            open: box.open.get()
        };
    },
    items: {
        get: () => state.element.items.list().map(item => item.summary.get()),
        short: () => state.element.items.list().map(item => item.summary.short())
    }

});

const newBox = (boxName) => {

    let state = copyObject(config);

    state.name = boxName;

    state.element = {
        name: name(state),
        open: open(state),
        items: items(state),
        summary: summary(state),
        event: new EventEmitter()
    };

    return state.element;
};

export const createBox = ({average}) => {

    const weaponsCount = randomInt(2, 0),
        armorCount = randomInt(2, 0),
        consumableCount = randomInt(3, 1);

    let box = newBox(createName(boxNames)),
        items = [],
        i;

    for (i = 0; i < weaponsCount; i++) {

        items.push(item.createWeapon({
            rank: average.rank,
            slots: 6,
            attack: average.attack,
            defense: 0,
            dexterity: average.dexterity,
            speed: -5
        }));
    }

    for (i = 0; i < armorCount; i++) {

        items.push(item.createArmor({
            rank: average.rank,
            slots: 4,
            attack: 2,
            defense: average.defense,
            dexterity: average.dexterity,
            speed: -3
        }));
    }

    for (i = 0; i < consumableCount; i++) {

        items.push(item.createConsumable({
            rank: average.rank,
            slots: 2,
            attack: average.attack,
            defense: average.defense,
            dexterity: average.dexterity,
            speed: average.speed,
            health: average.health
        }));
    }

    items.forEach(item => {
        box.items.add(item);
    });

    return box;
};

export const createBoxes = (options, count) => {

    let i = 0,
        boxes = [];

    for (i; i < count; i++) {
        boxes.push(createBox(options));
    }

    return boxes;
};
