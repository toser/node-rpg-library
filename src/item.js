import {EventEmitter} from 'events';
import {getConfig, copyObject, getFirstByType} from 'helptos';
import * as properties from './properties';

const config = getConfig('../config/item.json', __dirname);

// assign numerical getter and setter to properties
const rank = (state) => Object.assign({}, properties.numerical('rank', state.properties, state)),
    slots = (state) => Object.assign({}, properties.numerical('slots', state.properties, state)),
    attack = (state) => Object.assign({}, properties.numerical('attack', state.properties, state)),
    defense = (state) => Object.assign({}, properties.numerical('defense', state.properties, state)),
    dexterity = (state) => Object.assign({}, properties.numerical('dexterity', state.properties, state)),
    speed = (state) => Object.assign({}, properties.numerical('speed', state.properties, state)),
    time = (state) => Object.assign({}, properties.numerical('time', state.properties, state));


const collectible = (state) => ({
    get: () => state.collectible,
    set: (collectible) => {
        state.collectible = !!collectible;
        return state.element;
    }
});

const name = (state) => ({
    get: () => state.name,
    set: (name) => {
        if (name) {
            state.name = name;
        }
        return state.element;
    }
});

// creates a new iten
export let newItem = (itemName, type) => {

    // get template for item type
    let state = getFirstByType(copyObject(config).templates, type);

    state.name = itemName;
    state.element = {
        name: name(state),
        rank: rank(state),
        slots: slots(state),
        attack: attack(state),
        defense: defense(state),
        dexterity: dexterity(state),
        speed: speed(state),
        time: time(state),
        collectible: collectible(state),
        event: new EventEmitter()
    };

    return state.element;
};

// item types
export const types = {
    WEAPON: 'weapon',
    ARMOR: 'armor',
    CONSUMABLE: 'consumable'
};