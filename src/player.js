import {EventEmitter} from 'events';
import {getConfig, copyObject} from 'helptos';
import * as properties from './properties';
import * as race from './race';

const config = getConfig('../config/player.json', __dirname);


const health = (state) => Object.assign({}, properties.numerical('health', state.properties, state)),
    rank = (state) => Object.assign({}, properties.numerical('rank', state.properties, state)),
    attack = (state) => Object.assign({}, properties.numerical('attack', state.properties, state)),
    defense = (state) => Object.assign({}, properties.numerical('defense', state.properties, state)),
    dexterity = (state) => Object.assign({}, properties.numerical('dexterity', state.properties, state)),
    speed = (state) => Object.assign({}, properties.numerical('speed', state.properties, state));


const slots = (state) => ({
    total: () => state.inventory.slots.total,
    free: () => state.inventory.slots.free,
    up: (val = 1) => {
        state.inventory.slots.total = state.inventory.slots.total + val;
        state.inventory.slots.free = state.inventory.slots.free + val;

        return state.element;
    },
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


const items = (state) => ({
    list: () => state.inventory.items,
    add: (item) => {

        let playerSlots = slots(state),
            playerRank = rank(state);

        if (playerRank.get() < item.rank) {

            state.element.event.emit('failure', {
                action: 'add item',
                type: 'rank',
                data: {
                    player: state,
                    item: item
                }
            });
        }
        else if (!item.collectible.get()) {

            state.element.event.emit('failure', {
                action: 'add item',
                type: 'collectable',
                data: {
                    player: state,
                    item: item
                }
            });
        }
        else if (playerSlots.fill(item.slots) === false) {

            state.element.event.emit('failure', {
                action: 'add item',
                type: 'slots',
                data: {
                    player: state,
                    item: item
                }
            });
        }
        else {
            state.inventory.items.push(item);
        }

        return state.element;
    },
    remove: (item) => {

        // ToDo: remove item from inventory
        console.log('not implemented');

        return false;
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