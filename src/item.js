import {EventEmitter} from 'events';
import {getConfig, copyObject, getFirstByType} from 'helptos';
import {WeightedSelection, randomInt} from 'random-tools';
import {createName} from './name';
import * as properties from './properties';

const config = getConfig('../config/item.json', __dirname);
const weaponNames = getConfig('../config/names/weapon-names.json', __dirname);
const armorNames = getConfig('../config/names/armor-names.json', __dirname);
const consumableNames = getConfig('../config/names/consumable-names.json', __dirname);

// assign numerical getter and setter to properties
const name = (state) => Object.assign({}, properties.mixed('name', state, state)),
    type = (state) => Object.assign({}, properties.fixed('type', state, state)),
    collectible = (state) => Object.assign({}, properties.boolean('name', state, state)),
    rank = (state) => Object.assign({}, properties.numerical('rank', state.properties, state)),
    slots = (state) => Object.assign({}, properties.numerical('slots', state.properties, state)),
    health = (state) => Object.assign({}, properties.numerical('health', state.properties, state)),
    attack = (state) => Object.assign({}, properties.numerical('attack', state.properties, state)),
    defense = (state) => Object.assign({}, properties.numerical('defense', state.properties, state)),
    dexterity = (state) => Object.assign({}, properties.numerical('dexterity', state.properties, state)),
    speed = (state) => Object.assign({}, properties.numerical('speed', state.properties, state)),
    time = (state) => Object.assign({}, properties.numerical('time', state.properties, state));

const summary = state => ({


    get: () => {

        const item = state.element;

        return {
            name: item.name.get(),
            type: item.type.get(),
            rank: item.rank.get(),
            health: item.health.get(),
            attack: item.attack.get(),
            defense: item.defense.get(),
            dexterity: item.dexterity.get(),
            speed: item.speed.get(),
            time: item.time.get()
        };
    },
    short: () => {

        const item = state.element;

        return {
            name: item.name.get(),
            type: item.type.get(),
            rank: item.rank.get()
        };
    }

    /*,
     short: () => {

     const player = state.element;

     return {
     name: player.name.get(),
     rank: player.rank.get()
     };
     },
     long: () => {
     const player = state.element;

     return {
     name: player.name.get(),
     rank: player.rank.get(),
     health: player.health.get(),
     attack: player.attack.get(),
     defense: player.defense.get(),
     dexterity: player.dexterity.get(),
     speed: player.speed.get(),
     weapon: player.items.listWeapon().map(item => item.name.get()),
     armor: player.items.listArmor().map(item => item.name.get()),
     consumable: player.items.listConsumable().map(item => item.name.get())
     };
     },
     items: {}*/

});

// creates a new item
const newItem = (itemName, itemType) => {

    // get template for item type
    let state = getFirstByType(copyObject(config).templates, itemType);

    state.name = itemName;
    state.element = {
        name: name(state),
        type: type(state),
        rank: rank(state),
        slots: slots(state),
        health: health(state),
        attack: attack(state),
        defense: defense(state),
        dexterity: dexterity(state),
        speed: speed(state),
        time: time(state),
        collectible: collectible(state),
        summary: summary(state),
        event: new EventEmitter()
    };

    return state.element;
};

export const createWeapon = (averages) => {

    let weapon = newItem(createName(weaponNames), types.WEAPON);

    // Todo: get the ranges around averages via a config or something
    weapon
        .rank.up(randomInt(averages.rank + 1, averages.rank - 2))
        .slots.up(randomInt(averages.slots + 4, averages.slots - 4))
        .attack.up(randomInt(averages.attack + 10, averages.attack - 10))
        .defense.up(randomInt(averages.defense + 2, averages.defense - 2))
        .speed.up(randomInt(averages.speed + 2, averages.speed - 10))
        .dexterity.up(randomInt(averages.dexterity + 5, averages.dexterity - 5));

    return weapon;
};

export const createArmor = (averages) => {

    let armor = newItem(createName(armorNames), types.ARMOR);

    // Todo: get the ranges around averages via a config or something
    armor
        .rank.up(randomInt(averages.rank + 1, averages.rank - 2))
        .slots.up(randomInt(averages.slots + 3, averages.slots - 3))
        .attack.up(randomInt(averages.attack + 2, averages.attack - 2))
        .defense.up(randomInt(averages.defense + 10, averages.defense - 5))
        .speed.up(randomInt(averages.speed + 2, averages.speed - 8))
        .dexterity.up(randomInt(averages.dexterity + 5, averages.dexterity - 5));

    return armor;
};

export const createConsumable = (averages) => {

    const effect = new WeightedSelection({
        'attack': 1,
        'defense': 1,
        'speed': 1,
        'dexterity': 1
    }).random();

    let consumable = newItem(createName(consumableNames), types.CONSUMABLE);

    // Todo: get the ranges around averages via a config or something
    consumable
        .rank.up(randomInt(averages.rank + 1, averages.rank - 3))
        .slots.up(randomInt(averages.slots + 2, averages.slots - 1))
        .health.up(randomInt(60, 10))
        .time.up(randomInt(120, 30))
        [effect].up(randomInt(averages[effect] * 2, parseInt(averages[effect] * .5)));

    return consumable;
};


// item types
export const types = {
    WEAPON: 'weapon',
    ARMOR: 'armor',
    CONSUMABLE: 'consumable'
};