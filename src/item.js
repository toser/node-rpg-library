import {EventEmitter} from 'events';
import {getConfig, copyObject, getFirstByType} from 'helptos';
import {WeightedSelection, randomInt} from 'random-tools';
import * as properties from './properties';

const config = getConfig('../config/item.json', __dirname);
const weaponNames = getConfig('../config/weapon-names.json', __dirname);
const armorNames = getConfig('../config/armor-names.json', __dirname);
const consumableNames = getConfig('../config/consumable-names.json', __dirname);

// assign numerical getter and setter to properties
const rank = (state) => Object.assign({}, properties.numerical('rank', state.properties, state)),
    slots = (state) => Object.assign({}, properties.numerical('slots', state.properties, state)),
    health = (state) => Object.assign({}, properties.numerical('health', state.properties, state)),
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

const createName = (names) => {

    const ran1To2 = new WeightedSelection({
        '1': 1,
        '0': 2
    }), ran1To1 = new WeightedSelection({
        '1': 1,
        '0': 1
    }), ran2To1 = new WeightedSelection({
        '1': 2,
        '0': 1
    });

    let name = '';

    if (!!parseInt(ran2To1.random())) {
        name += names.adjective[randomInt(names.adjective.length - 1)] + ' ';
    }

    if (!!parseInt(ran1To2.random())) {
        name += names.attribute[randomInt(names.attribute.length - 1)] + ' ';
    }

    name += names.object[randomInt(names.object.length - 1)] + ' ';

    if (!!parseInt(ran1To2.random())) {
        name += names.origin[randomInt(names.origin.length - 1)] + ' ';
    }

    return name.trim()

};

// creates a new iten
export const newItem = (itemName, type) => {

    // get template for item type
    let state = getFirstByType(copyObject(config).templates, type);

    state.name = itemName;
    state.element = {
        name: name(state),
        rank: rank(state),
        slots: slots(state),
        health: health(state),
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

export const createWeapon = (averages) => {

    let weapon = newItem(createName(weaponNames), types.WEAPON);

    // Todo: get the ranges around averages via a config or something
    weapon
        .rank.up(randomInt(averages.rank + 2, averages.rank - 2))
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
        .rank.up(randomInt(averages.rank + 2, averages.rank - 2))
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
        .rank.up(randomInt(averages.rank + 2, averages.rank - 3))
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