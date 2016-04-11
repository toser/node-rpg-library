import * as player from './player';
import * as box from './box';


let toni = player.newPlayer('Toni', 'cat');

toni.rank.up(3)
/*.attack.up(50)
 .defense.up(70)
 .speed.up(30)
 .dexterity.up(45)*/;

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

console.log(
    `\n${myBox.name.get()}:\n--------------------\n` +
    myBox.items.list().map(
        item => ({
            name: item.name.get(),
            type: item.type.get(),
            attack: item.attack.get(),
            defense: item.defense.get()
        }))
        .reduce((out, item) => {
            return out += `-> ${item.name} with ${item.attack} attack and ${item.defense} defense\n`
        }, ''));


myBox.items.remove(
    myBox.items.list()[0].name.get()
);

console.log(
    `\n${myBox.name.get()}:\n--------------------\n` +
    myBox.items.list().map(
        item => ({
            name: item.name.get(),
            type: item.type.get(),
            attack: item.attack.get(),
            defense: item.defense.get()
        }))
        .reduce((out, item) => {
            return out += `-> ${item.name} with ${item.attack} attack and ${item.defense} defense\n`
        }, ''));