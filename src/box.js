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

const items = state => Object.assign({

        add: (item) => {

            state.items.push(item);

            return state.element;
        },
        remove: properties.removeFromList(state, state.items,

            (success, item) => {

                if (success) {
                    state.element.event.emit('success', {
                        action: 'remove item',
                        data: {
                            box: state.element,
                            item: item
                        }
                    });
                }
                else {

                    state.element.event.emit('failure', {
                        action: 'remove item',
                        data: {
                            box: state.element,
                            item: item
                        }
                    });
                }

                return state.element;
            })
    },
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
        get: () => {

            const box = state.element;

            return box.items.list().map(item => item.summary.get());
        },
        short: () => {

            const box = state.element;

            return box.items.list().map(item => item.summary.short());
        }
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

export const createBox = () => {

    // ToDo: pass team to get averages

    const weaponsCount = randomInt(2, 0),
        armorCount = randomInt(2, 0),
        consumableCount = randomInt(3, 0);

    let box = newBox(createName(boxNames)),
        items = [],
        i;

    //ToDo: also set dexterity value to open box (or find box - idk yet)

    for (i = 0; i < weaponsCount; i++) {

        // ToDo: get averages from team
        items.push(item.createWeapon({
            rank: 3,
            slots: 6,
            attack: 10,
            defense: 0,
            dexterity: 5,
            speed: -5
        }));
    }

    for (i = 0; i < armorCount; i++) {

        // ToDo: get averages from team
        items.push(item.createArmor({
            rank: 3,
            slots: 4,
            attack: 3,
            defense: 10,
            dexterity: 5,
            speed: -3
        }));
    }

    for (i = 0; i < consumableCount; i++) {

        // ToDo: get averages from team
        items.push(item.createConsumable({
            rank: 3,
            slots: 2,
            attack: 10,
            defense: 10,
            dexterity: 10,
            speed: 10
        }));
    }

    items.forEach(item => {
        box.items.add(item);
    });

    return box;
};