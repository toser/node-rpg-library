import * as player from './player';
import * as item from './item';


let toni = player.newPlayer('Toni', 'cat');

toni.rank.up(10)
    .attack.up(50)
    .defense.up(70)
    .speed.up(30)
    .dexterity.up(45)
    .event.on('failure', (e) => {
    console.log(`${e.data.player.name.get()} can not ${e.action} ${e.data.item.name.get()}. because of ${e.type}`);
});

let weapon = item.createWeapon({
    rank: toni.rank.get(),
    slots: 6,
    attack: toni.attack.get(),
    defense: 0,
    dexterity: toni.dexterity.get(),
    speed: -5
});

let armor = item.createArmor({
    rank: toni.rank.get(),
    slots: 4,
    attack: 3,
    defense: toni.defense.get(),
    dexterity: toni.dexterity.get(),
    speed: -3
});

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
        console.log(`${toni.name.get()} has the ${item.name.get()} with: 
    ${item.rank.get()} rank,
    ${item.slots.get()} slots,
    ${item.attack.get()} attack,
    ${item.defense.get()} defense,
    ${item.dexterity.get()} dexterity,
    ${item.speed.get()} speed,`);

    });

console.log(
    `${toni.name.get()} has ${toni.slots.free()} slots free.`
);

/*
 let toni = player.newPlayer('Toni', 'cat'),
 sword = item.newItem('rusty old sword', item.types.WEAPON),
 helmet = item.newItem('broken helmet', item.types.ARMOR);

 toni.rank.up(3)
 .speed.up(20);


 sword.slots.up(8)
 .attack.up(16)
 .defense.up(2)
 .speed.down(3);

 helmet.slots.up(4)
 .defense.up(10)
 .speed.down(2);

 toni.event.on('failure', function (e) {

 console.log(`failure at ${e.action}. type: ${e.type}`);
 });

 console.log(
 `Tonis speed is ${toni.speed.get()}`
 );

 toni.speed.down(2);

 console.log(
 `Tonis speed is now ${toni.speed.get()}`
 );

 toni.items.add(sword)
 .items.add(helmet)
 .items.list().forEach(
 item => {
 console.log(`${toni.name.get()} has a ${item.name.get()} with ${item.attack.get()} attack and ${item.defense.get()} defense points.`);
 });*/
