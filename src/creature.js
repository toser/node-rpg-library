import {EventEmitter} from 'events';
import {getConfig, copyObject, getFirstByName} from 'helptos';
import {randomInt} from 'random-tools';
import {createName} from './name';
import * as properties from './properties';
import * as race from './race';
import * as item from './item';

function createItems(creature) {

    const summary = creature.summary.get(),
        weaponsCount = randomInt(2, 1),
        armorCount = randomInt(2, 0),
        consumableCount = randomInt(2, 0);

    let items = [],
        i;

    for (i = 0; i < weaponsCount; i++) {

        items.push(item.createWeapon({
                rank: summary.rank,
                slots: 6,
                attack: summary.attack,
                defense: 0,
                dexterity: summary.dexterity,
                speed: -5
            }));
    }

    for (i = 0; i < armorCount; i++) {

        items.push(item.createArmor({
            rank: summary.rank,
            slots: 4,
            attack: 2,
            defense: summary.defense,
            dexterity: summary.dexterity,
            speed: -3
        }));
    }

    for (i = 0; i < consumableCount; i++) {

        items.push(item.createConsumable({
            rank: summary.rank,
            slots: 2,
            attack: summary.attack,
            defense: summary.defense,
            dexterity: summary.dexterity,
            speed: summary.speed,
            health: summary.health
        }));
    }

    return items;
}

const config = getConfig('../config/creature.json', __dirname);
const creatureNames = getConfig('../config/names/creature-names.json', __dirname);


const name = (state) => Object.assign({}, properties.mixed('name', state)),
    type = (state) => Object.assign({}, properties.fixed('type', state)),
    health = (state) => Object.assign({}, properties.numerical('health', state.properties, state)),
    rank = (state) => Object.assign({}, properties.numerical('rank', state.properties, state)),
    attack = (state) => Object.assign({}, properties.numerical('attack', state.properties, state)),
    defense = (state) => Object.assign({}, properties.numerical('defense', state.properties, state)),
    aggression = (state) => Object.assign({}, properties.numerical('aggression', state.properties, state));

/**
 * anything you can do with inventory items
 *
 * @param state
 */
const items = (state) => Object.assign({},
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

        const creature = state.element;

        return {
            name: creature.name.get(),
            type: creature.type.get(),
            rank: creature.rank.get(),
            health: creature.health.get(),
            attack: creature.attack.get(),
            defense: creature.defense.get(),
            aggression: creature.aggression.get()
        };
    },
    short: () => {

        const creature = state.element;

        return {
            name: creature.name.get(),
            type: creature.type.get(),
            rank: creature.rank.get()
        };
    },
    long: () => {

        const creature = state.element;

        return {
            name: creature.name.get(),
            type: creature.type.get(),
            rank: creature.rank.get(),
            health: creature.health.get(),
            attack: creature.attack.get(),
            defense: creature.defense.get(),
            aggression: creature.aggression.get(),
            weapon: creature.items.listWeapon().map(item => item.summary.short()),
            armor: creature.items.listArmor().map(item => item.summary.short()),
            consumable: creature.items.listConsumable().map(item => item.summary.short())
        };
    },
    items: {
        get: () => {

            const creature = state.element;

            return creature.items.list().map(item => item.summary.get());
        },
        short: () => {

            const creature = state.element;

            return creature.items.list().map(item => item.summary.short());
        }
    }

});

const newCreature = (creatureName, creatureRace) => {

    let state = copyObject(config);
    const raceState = race.getRace(creatureRace);

    state.name = creatureName;
    state.type = raceState.type;
    state.properties = Object.assign(state.properties, raceState.properties);

    state.element = {
        name: name(state),
        type: type(state),
        health: health(state),
        rank: rank(state),
        attack: attack(state),
        defense: defense(state),
        aggression: aggression(state),
        items: items(state),
        summary: summary(state),
        event: new EventEmitter()
    };

    return state.element;
};

export const createCreature = (average) => {

    const races = race.getRaces(),
        creatureName = createName(creatureNames),
        creatureRace = races[randomInt(races.length - 1, 0)],
        creature = newCreature(creatureName, creatureRace);

    creature.health.up(randomInt(30, -40));
    creature.rank.up(randomInt(average.rank + 2, average.rank - 3));
    creature.aggression.up(randomInt(100, 0));
    creature.items.add(createItems(creature));

    return creature;
};
