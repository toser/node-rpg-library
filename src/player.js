import {EventEmitter} from 'events';
import {getConfig, copyObject, getFirstByName} from 'helptos';
import * as properties from './properties';
import * as race from './race';

const config = getConfig('../config/player.json', __dirname);

const name = (state) => Object.assign({}, properties.mixed('name', state, state)),
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
const slots = (state) => ({

    /**
     * get total number of slots
     * @returns {int}
     */
    total: () => state.inventory.slots.total,

    /**
     * get number of free slots
     * @returns {int}
     */
    free: () => state.inventory.slots.free,

    /**
     * add slots
     *
     * @param val
     * @returns {object} plyer object
     */
    up: (val = 1) => {
        state.inventory.slots.total = state.inventory.slots.total + val;
        state.inventory.slots.free = state.inventory.slots.free + val;

        return state.element;
    },

    /**
     * remove slots
     *
     * @param val
     * @returns {object}
     */
    down: (val = 1) => {

        if (state.inventory.slots.free - val < 0) {

            state.element.event.emit('failure', {
                action: 'slots down',
                data: {
                    player: state
                }
            });
        }
        else {

            state.inventory.slots.total = state.inventory.slots.total - val;
            state.inventory.slots.free = state.inventory.slots.free - val;
        }

        return state.element;
    },

    /**
     * fill slots
     *
     * @param val
     * @returns {object}
     */
    fill: (val = 1) => {

        if (state.inventory.slots.free - val < 0) {

            state.element.event.emit('failure', {
                action: 'slots fill',
                data: {
                    player: state
                }
            });
        }
        else {

            state.inventory.slots.free = state.inventory.slots.free - val;
        }

        return state.element;
    },

    /**
     * empty slots
     *
     * @param val
     * @returns {object}
     */
    empty: (val = 1) => {

        if (state.inventory.slots.free + val > state.inventory.slots.total) {
            state.inventory.slots.free = state.inventory.slots.total;
        }
        else {
            state.inventory.slots.free = state.inventory.slots.free + val;
        }

        return state.element;
    }
});

/**
 * anything you can do with inventory items
 *
 * @param state
 */
const items = (state) => ({

    /**
     * get list of all items
     *
     * @returns {array}
     */
    list: () => state.inventory.items,
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
        else if (state.element.slots.fill(item.slots.get()) === false) {

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
            state.inventory.items.push(item);

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
    remove: (itemName) => {

        let index = false,
            item;

        // search for item (by name) in players item list
        state.inventory.items.forEach(
            (playerItem, i) => {
                if (playerItem.name.get() === itemName) {
                    index = i;
                    item = playerItem;
                }
            }
        );

        // emit failure when item is not in the players inventory
        if (index === false) {

            state.element.event.emit('failure', {
                action: 'remove item',
                data: {
                    player: state.element,
                    item: itemName
                }
            });

        }
        // remove item from players inventory
        // empty the inventory slots
        // emit success
        else {

            state.inventory.items.splice(index, 1);
            state.element.slots.empty(item.slots.get());

            state.element.event.emit('success', {
                action: 'remove item',
                data: {
                    player: state.element,
                    item: item
                }
            });
        }

        return state.element;
    }
});

/*const name = (state) => ({
 get: () => state.name,
 set: (name) => {
 if (name) {
 state.name = name;
 }
 return state.element;
 }
 });*/


export let newPlayer = (playerName, playerRace) => {

    let state = copyObject(config);

    state.name = playerName;
    state.race = Object.assign({}, race.getRace(playerRace));
    state.element = {
        name: name(state),
        health: health(state),
        rank: rank(state),
        attack: attack(state),
        defense: defense(state),
        dexterity: dexterity(state),
        speed: speed(state),
        slots: slots(state),
        items: items(state),
        event: new EventEmitter()
    };

    return state.element;
};