import * as player from './player';
import * as item from './item';


let toni = player.newPlayer('Toni', 'cat');

toni.rank.up(10)
    .attack.up(50)
    .defense.up(70)
    .speed.up(30)
    .dexterity.up(45);

toni.event.on('failure', (e) => {

    switch (e.action) {
        case 'add item':
            console.log(`${e.data.player.name.get()} can not ${e.action} ${e.data.item.name.get()}. Because of ${e.type}.`);
            break;
        case 'remove item':
            console.log(`${e.data.player.name.get()} can not ${e.action} ${e.data.item}. Not in the inventory.`);
            break;
    }


});

toni.event.on('success', (e) => {
    console.log(`${e.data.player.name.get()} does ${e.action} ${e.data.item.name.get()}.`);
});

// ToDo: how do we get property averages?
let weapon = item.createWeapon({
    rank: toni.rank.get(),
    slots: 6,
    attack: toni.attack.get(),
    defense: 0,
    dexterity: toni.dexterity.get(),
    speed: -5
});

// ToDo: how do we get property averages?
let armor = item.createArmor({
    rank: toni.rank.get(),
    slots: 4,
    attack: 3,
    defense: toni.defense.get(),
    dexterity: toni.dexterity.get(),
    speed: -3
});

// ToDo: how do we get property averages?
let consumable = item.createConsumable({
    rank: toni.rank.get(),
    slots: 2,
    attack: toni.defense.get(),
    defense: toni.defense.get(),
    dexterity: toni.dexterity.get(),
    speed: toni.dexterity.get()
});

console.log(
    `${toni.name.get()} has ${toni.slots.free()} slots free.`
);
console.log(
    `${toni.name.get()} has rank ${toni.rank.get()}`
);

toni
    .items.add(weapon)
    .items.add(armor)
    .items.add(consumable)
    .items.list().forEach(
    item => {
        console.log(
            `${toni.name.get()} has the ${item.name.get()} with: 
            ${item.rank.get()} rank,
            ${item.slots.get()} slots,
            ${item.attack.get()} attack,
            ${item.defense.get()} defense,
            ${item.dexterity.get()} dexterity,
            ${item.speed.get()} speed,`
        );

    });

console.log(
    `${toni.name.get()} has ${toni.slots.free()} slots free.`
);


toni
    .items.remove(toni.items.list()[0].name.get())
    .items.remove('test');

toni
    .items.list().forEach(
    item => {
        console.log(
            `${toni.name.get()} has the ${item.name.get()} with: 
            ${item.rank.get()} rank,
            ${item.slots.get()} slots,
            ${item.attack.get()} attack,
            ${item.defense.get()} defense,
            ${item.dexterity.get()} dexterity,
            ${item.speed.get()} speed,`
        );

    });


console.log(
    `${toni.name.get()} has ${toni.slots.free()} slots free.`
);