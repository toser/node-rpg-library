import {EventEmitter} from 'events';
import {getConfig, copyObject, getFirstByType} from 'helptos';

const config = getConfig('../config/item.json', __dirname);

// basic getter and setter for properties
const properties = (property, state) => ({
    get: () => state.properties[property],
    up: (val = 1) => {
        state.properties[property] = state.properties[property] + val;
        return state.item;
    },
    down: (val = 1) => {

        // ToDo: check if properties can be negative. imo: absolutely, because an item can have negative influence on players skills
        /*if (state.properties[property] - val < 0) {

         state.item.event.emit('failure', {
         action: `${property} down`,
         data: {
         item: state
         }
         });
         }
         else {*/
        state.properties[property] = state.properties[property] - val;
        /*}*/

        return state.item;
    }
});

// assign getter and setter to properties
const rank = (state) => Object.assign({}, properties('rank', state)),
    slots = (state) => Object.assign({}, properties('slots', state)),
    attack = (state) => Object.assign({}, properties('attack', state)),
    defense = (state) => Object.assign({}, properties('defense', state)),
    dexterity = (state) => Object.assign({}, properties('dexterity', state)),
    speed = (state) => Object.assign({}, properties('speed', state)),
    time = (state) => Object.assign({}, properties('time', state));


const collectible = (state) => ({
    get: () => state.collectible,
    set: (collectible) => {
        state.collectible = !!collectible;
        return state.item;
    }
});

const name = (state) => ({
    get: () => state.name,
    set: (name) => {
        if (name) {
            state.name = name;
        }
        return state.item;
    }
});

// creates a new iten
export let newItem = (itemName, type) => {

    // get template for item type
    let state = getFirstByType(copyObject(config).templates, type);

    state.name = itemName;
    state.item = {
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

    return state.item;
};

// item types
export const types = {
    WEAPON: 'weapon',
    ARMOR: 'armor',
    CONSUMABLE: 'consumable'
};