import * as player from './player';
import * as group from './group';
import * as box from './box';


let toni = player.newPlayer('Toni', 'cat'),
    myGroup = group.newGroup('Fighter of Glory');

myGroup.members.add(toni);

toni.rank.up(3);

toni.event.on('failure', (e) => {

    switch (e.action) {
    case 'add item':
        console.log(`${e.data.player.name.get()}: can not ${e.action} ${e.data.item.name.get()}. Because of ${e.type}.`);
        break;
    case 'remove item':
        console.log(`${e.data.player.name.get()}: can not ${e.action} ${e.data.item}. Not in the inventory.`);
        break;
    }
});

toni.event.on('success', (e) => {
    console.log(`${e.data.player.name.get()}: ${e.action} ${e.data.item.name.get()}.`);
});

let myBox = box.createBox();

myBox.items.list().map(item => item).forEach((item) => {
    toni.items.add(item);
    myBox.items.remove(item.name.get());
});


console.log('short', toni.summary.short());
console.log('get', toni.summary.get());
console.log('long', toni.summary.long());
console.log('items get', toni.summary.items.get());
console.log('items short', toni.summary.items.short());

/*
 let myBox = box.createBox();

 console.log(
 `\n|----------------------------------------\n| ${myBox.name.get()}\n|----------------------------------------\n` +
 '|\n| weapons:\n' +
 myBox.items.listWeapon().map(
 item => ({
 name: item.name.get(),
 type: item.type.get(),
 attack: item.attack.get(),
 defense: item.defense.get()
 }))
 .reduce((out, item) => {
 return out += `| -> ${item.name} with A ${item.attack} and D ${item.defense}\n`
 }, '') +

 '|\n| armor:\n' +
 myBox.items.listArmor().map(
 item => ({
 name: item.name.get(),
 type: item.type.get(),
 attack: item.attack.get(),
 defense: item.defense.get()
 }))
 .reduce((out, item) => {
 return out += `| -> ${item.name} with A ${item.attack} and D ${item.defense}\n`
 }, '') +

 '|\n| consumable:\n' +
 myBox.items.listConsumable().map(
 item => ({
 name: item.name.get(),
 type: item.type.get(),
 attack: item.attack.get(),
 defense: item.defense.get(),
 health: item.health.get(),
 dexterity: item.dexterity.get(),
 speed: item.speed.get(),
 time: item.time.get()
 }))
 .reduce((out, item) => {
 return out += `| -> ${item.name} with A ${item.attack}, D ${item.defense}, H ${item.health}, DX ${item.dexterity} and S ${item.speed} for ${item.time}sec\n`
 }, '') +

 '|\n|----------------------------------------\n'
 );


 myBox.items.list().map(item => item).forEach((item) => {
 toni.items.add(item);
 myBox.items.remove(item.name.get());
 });


 console.log(toni.items.list().map(item => item.name.get()));

 console.log('weapons', toni.items.listWeapon().map(item => item.name.get()));
 console.log('armor', toni.items.listArmor().map(item => item.name.get()));
 console.log('consumable', toni.items.listConsumable().map(item => item.name.get()));

 console.log(toni.slots.free());*/
