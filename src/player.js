import {EventEmitter} from 'events';
import {getConfig, copyObject} from 'helptos';
import * as race from './race';

const skills = (skill, state) => ({
    is: () => state.skills[skill],
    up: (val = 1) => {
        state.skills[skill] = state.skills[skill] + val;
        return state.player;
    },
    down: (val = 1) => {

        if (state.skills[skill] - val < 0) {

            state.player.event.emit('failure', {
                action: `${skill} down`,
                data: {
                    player: state
                }
            });
        }
        else {
            state.skills[skill] = state.skills[skill] - val;
        }

        return state.player;
    }
});

const health = (state) => Object.assign({}, skills('health', state)),
    rank = (state) => Object.assign({}, skills('rank', state)),
    attack = (state) => Object.assign({}, skills('attack', state)),
    defense = (state) => Object.assign({}, skills('defense', state)),
    dexterity = (state) => Object.assign({}, skills('dexterity', state)),
    speed = (state) => Object.assign({}, skills('speed', state));


const slots = (state) => ({
    total: () => state.inventory.slots.total,
    free: () => state.inventory.slots.free,
    up: (val = 1) => {
        state.inventory.slots.total = state.inventory.slots.total + val;
        state.inventory.slots.free = state.inventory.slots.free + val;

        return state.player;
    },
    down: (val = 1) => {

        if (state.inventory.slots.free - val < 0) {

            state.player.event.emit('failure', {
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

        return state.player;
    },
    fill: (val = 1) => {

        if (state.inventory.slots.free - val < 0) {

            state.player.event.emit('failure', {
                action: 'slots fill',
                data: {
                    player: state
                }
            });
        }
        else {

            state.inventory.slots.free = state.inventory.slots.free - val;
        }

        return state.player;
    },
    empty: (val = 1) => {

        if (state.inventory.slots.free + val > state.inventory.slots.total) {
            state.inventory.slots.free = state.inventory.slots.total;
        }
        else {
            state.inventory.slots.free = state.inventory.slots.free + val;
        }

        return state.player;
    }
});


const items = (state) => ({
    list: () => state.inventory.items,
    add: (item) => {

        let playerSlots = slots(state),
            playerRank = rank(state);

        if (playerRank.is() < item.rank) {

            state.player.event.emit('failure', {
                action: 'add item',
                type: 'rank',
                data: {
                    player: state,
                    item: item
                }
            });
        }
        else if (!item.collectible) {

            state.player.event.emit('failure', {
                action: 'add item',
                type: 'collectable',
                data: {
                    player: state,
                    item: item
                }
            });
        }
        else if (playerSlots.fill(item.slots) === false) {

            state.player.event.emit('failure', {
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

        return state.player;
    },
    remove: (item) => {

        // ToDo: remove item from inventory
        console.log('not implemented');

        return false;
    }
});


const config = getConfig('../config/player.json', __dirname);


export let newPlayer = (name, playerRace) => {

    let state = copyObject(config);

    state.name = name;
    state.race = Object.assign({}, race.getRace(playerRace));
    state.player = {
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

    return state.player;
};