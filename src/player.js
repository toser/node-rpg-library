import * as race from './race';
import {getConfig, copyObject} from 'helptos';

const skills = (skill, {skills}) => ({
    is: () => skills[skill],
    up: (val = 1) => skills[skill] = skills[skill] + val,
    down: (val = 1) => skills[skill] = skills[skill] - val
});

const health = (player) => Object.assign({}, skills('health', player)),
    rank = (player) => Object.assign({}, skills('rank', player)),
    attack = (player) => Object.assign({}, skills('attack', player)),
    defense = (player) => Object.assign({}, skills('defense', player)),
    dexterity = (player) => Object.assign({}, skills('dexterity', player)),
    speed = (player) => Object.assign({}, skills('speed', player));


const slots = ({inventory: {slots}}) => ({
    total: () => slots.total,
    free: () => slots.free,
    add: (val = 1) => {
        slots.total = slots.total + val;
        slots.free = slots.free + val;

        return slots.total;
    },
    remove: (val = 1) => {

        if (slots.free - val < 0) {
            return false;
        }

        slots.total = slots.total - val;
        slots.free = slots.free - val;

        return slots.total;
    },
    fill: (val = 1) => {

        if (slots.free - val < 0) {
            return false;
        }

        return slots.free = slots.free - val;
    },
    empty: (val = 1) => {

        if (slots.free + val > slots.total) {
            return slots.free = slots.total;
        }

        return slots.free = slots.free + val;
    }
});


const items = (player) => ({
    list: () => player.inventory.items,
    add: (item) => {

        let playerSlots = slots(player),
            playerRank = rank(player);

        if (playerRank.is() < item.rank) {

            return {
                error: 'rank',
                item: item
            }
        }

        if (item.type === 'locked') {

            return {
                error: 'type',
                item: item
            }
        }

        if (playerSlots.fill(item.slots) === false) {
            return {
                error: 'slots',
                item: item
            };
        }

        player.inventory.items.push(item);

        return item;
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

    return {
        health: health(state),
        rank: rank(state),
        attack: attack(state),
        defense: defense(state),
        dexterity: dexterity(state),
        speed: speed(state),
        slots: slots(state),
        items: items(state)
    };
};