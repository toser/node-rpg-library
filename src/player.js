import {EventEmitter} from 'events';
import {getConfig, copyObject, getFirstByName} from 'helptos';
import * as properties from './properties';
import * as race from './race';
import * as item from './item';

const config = getConfig('../config/player.json', __dirname);

const name = (state) => Object.assign({}, properties.mixed('name', state)),
    type = (state) => Object.assign({}, properties.fixed('type', state)),
    health = (state) => Object.assign({}, properties.numerical('health', state.properties, state)),
    rank = (state) => Object.assign({}, properties.numerical('rank', state.properties, state)),
    attack = (state) => Object.assign({}, properties.numerical('attack', state.properties, state)),
    defense = (state) => Object.assign({}, properties.numerical('defense', state.properties, state)),
    dexterity = (state) => Object.assign({}, properties.numerical('dexterity', state.properties, state)),
    speed = (state) => Object.assign({}, properties.numerical('speed', state.properties, state));

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
const items = (state) => Object.assign({

        /**
         * add item
         *
         * @param item
         * @returns {{name, type, health, rank, attack, defense, dexterity, speed, slots, items, event: *, describe: state.element.describe}|*}
         */
        add: (item) => {

            // emit failure when item is not collectible
            if (!item.collectible.get()) {

                state.element.event.emit('failure', {
                    action: 'add item',
                    type: 'collectable',
                    data: {
                        player: state.element,
                        item: item
                    }
                });
            }
            // emit failure when player has not the needed rank for this item
            else if (state.element.rank.get() < item.rank.get()) {

                state.element.event.emit('failure', {
                    action: 'add item',
                    type: 'rank',
                    data: {
                        player: state.element,
                        item: item
                    }
                });
            }
            // emit failure when player has not enough free slots for this item
            else if (state.element.slots.free() < item.slots.get()) {

                state.element.event.emit('failure', {
                    action: 'add item',
                    type: 'slots',
                    data: {
                        player: state.element,
                        item: item
                    }
                });
            }
            // add item and emit success when everything is fine
            else {
                state.items.push(item);

                state.element.event.emit('success', {
                    action: 'add item',
                    data: {
                        player: state.element,
                        item: item
                    }
                });
            }

            return state.element;
        },

        /**
         * remove item by item name
         *
         * @param itemName
         * @returns {boolean}
         */
        remove: properties.removeFromList(state, state.items,

            (success, item) => {

                if (success) {
                    state.element.event.emit('success', {
                        action: 'remove item',
                        data: {
                            player: state.element,
                            item: item
                        }
                    });
                }
                else {

                    state.element.event.emit('failure', {
                        action: 'remove item',
                        data: {
                            player: state.element,
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

        const player = state.element;

        return {
            name: player.name.get(),
            type: player.type.get(),
            rank: player.rank.get(),
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

export let newPlayer = (playerName, playerRace) => {

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
        summary: summary(state),
        event: new EventEmitter()
    };

    return state.element;
};