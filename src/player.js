import {EventEmitter} from 'events';
import {getConfig, copyObject, getFirstByName} from 'helptos';
import * as properties from './properties';
import * as race from './race';
import * as item from './item';

const config = getConfig('../config/player.json', __dirname);

const name = (state) => properties.mixed('name', state),
    type = (state) => properties.fixed('type', state),
    health = (state) => properties.numericalPositive('health', state.properties, state),
    rank = (state) => properties.numericalPositive('rank', state.properties, state),
    attack = (state) => properties.numerical('attack', state.properties, state),
    defense = (state) => properties.numerical('defense', state.properties, state),
    dexterity = (state) => properties.numerical('dexterity', state.properties, state),
    speed = (state) => properties.numerical('speed', state.properties, state),
    weapon = (state) => properties.mixed('weapon', state),
    armor = (state) => properties.mixed('armor', state);

/**
 * anything you can do with your inventory slots
 *
 * @param state
 */
const slots = (state) => Object.assign({

    filled: () => {

        return state.element.items.list().reduce((filled, item) => {
            return filled + item.slots.get();
        }, 0);
    },

    /**
     * get number of free slots
     * @returns {int}
     */
    free: () => {

        return state.element.slots.get() - state.element.slots.filled()
    }

}, properties.numerical('slots', state.properties, state));

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
    ),
    {
        /**
         * override add item default functionality
         *
         * @param item
         * @returns {{name, type, health, rank, attack, defense, dexterity, speed, slots, items, event: *, describe: state.element.describe}|*}
         */
        add: (item) => {

            if(item.collectible.get() &&
                state.element.rank.get() >= item.rank.get() &&
                state.element.slots.free() >= item.slots.get()){

                state.items.push(item);
            }

            return state.element;
        }
    }
);

const summary = state => ({


    get: () => {

        const player = state.element;

        return {
            name: player.name.get(),
            type: player.type.get(),
            rank: player.rank.get(),
            slots: player.slots.free(),
            health: player.health.get(),
            attack: player.attack.get(),
            defense: player.defense.get(),
            dexterity: player.dexterity.get(),
            speed: player.speed.get()
        };
    },
    short: () => {

        const player = state.element;

        return {
            name: player.name.get(),
            type: player.type.get(),
            rank: player.rank.get()
        };
    },
    long: () => {

        const player = state.element;

        return {
            name: player.name.get(),
            type: player.type.get(),
            rank: player.rank.get(),
            slots: player.slots.free(),
            health: player.health.get(),
            attack: player.attack.get(),
            defense: player.defense.get(),
            dexterity: player.dexterity.get(),
            speed: player.speed.get(),
            weapon: player.items.listWeapon().map(item => item.summary.short()),
            armor: player.items.listArmor().map(item => item.summary.short()),
            consumable: player.items.listConsumable().map(item => item.summary.short())
        };
    },
    items: {
        get: () => {

            const player = state.element;

            return player.items.list().map(item => item.summary.get());
        },
        short: () => {

            const player = state.element;

            return player.items.list().map(item => item.summary.short());
        }
    }

});

const newPlayer = (playerName, playerRace) => {

    let state = copyObject(config);
    const raceState = race.getRace(playerRace);

    state.name = playerName;
    state.type = raceState.type;
    state.properties = Object.assign(state.properties, raceState.properties);

    state.element = {
        name: name(state),
        type: type(state),
        health: health(state),
        rank: rank(state),
        attack: attack(state),
        defense: defense(state),
        dexterity: dexterity(state),
        speed: speed(state),
        slots: slots(state),
        items: items(state),
        weapon: weapon(state),
        armor: armor(state),
        summary: summary(state),
        event: new EventEmitter()
    };

    return state.element;
};

export const createPlayer = (playerName, playerRace) => {

    return newPlayer(playerName, playerRace);
};