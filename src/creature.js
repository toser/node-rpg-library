import {EventEmitter} from 'events';
import {getConfig, copyObject, getFirstByName} from 'helptos';
import {randomInt} from 'random-tools';
import {createName} from './name';
import * as properties from './properties';
import * as race from './race';
import * as item from './item';
import * as actions from './actions';

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
    health = (state) => Object.assign({}, properties.numericalPositive('health', state.properties, state)),
    rank = (state) => Object.assign({}, properties.numericalPositive('rank', state.properties, state)),
    attack = (state) => Object.assign({}, properties.numerical('attack', state.properties, state)),
    defense = (state) => Object.assign({}, properties.numerical('defense', state.properties, state)),
    aggression = (state) => Object.assign({}, properties.numericalPositive('aggression', state.properties, state));

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
            dead: isDead(creature),
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
            dead: isDead(creature),
            name: creature.name.get(),
            type: creature.type.get(),
            rank: creature.rank.get()
        };
    },
    long: () => {

        const creature = state.element;

        return {
            dead: isDead(creature),
            name: creature.name.get(),
            type: creature.type.get(),
            rank: creature.rank.get(),
            health: creature.health.get(),
            attack: creature.attack.get(),
            defense: creature.defense.get(),
            aggression: creature.aggression.get(),
            weapon: creature.items.listWeapon().map(item => item.summary.get()),
            armor: creature.items.listArmor().map(item => item.summary.get()),
            consumable: creature.items.listConsumable().map(item => item.summary.get())
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

export const createCreatures = ({average}, numberOfCreatures) => {

    const creatures = [];

    for (let i = 0; i < numberOfCreatures; i++) {
        creatures.push(createCreature(average));
    }

    return creatures;
};

export const activate = (creature, group) => {

    console.log('aggr', creature.aggression.get());
    console.log('group', group.name.get());

    if (creature.aggression.get() < 50) {
        return;
    }

    const players = group.members.list();
    console.log('group', group.members.list().map(x => x.name.get()));
    const activePlayer = group.members.list()[Math.floor(Math.random() * players.length)];
    console.log('active player', activePlayer.name.get());
    const delay = (activePlayer.dexterity.get() / 100)
        * (10 * (100 - creature.aggression.get()));

    console.log('delay', delay);

    setTimeout(() => {
        fight(creature, activePlayer);
    }, delay * 1000);

    // console.log('activePlayer', activePlayer.name.get());

    return creature;
};

export const fight = (creature, activePlayer) => {
    console.log('attack -> ', creature.name.get(), '->', activePlayer.name.get());
};

export const activateMap = group => creature => activate(creature, group);
export const isAggrassive = creature => creature.aggression.get() > 50;
export const isDead = creature => creature.health.get() <= 0;
