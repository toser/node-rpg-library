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

console.log(`------- ${myBox.name.get()} Summary:`);
console.log('short', myBox.summary.short());
console.log('get', myBox.summary.get());
console.log('items get', myBox.summary.items.get());
console.log('items short', myBox.summary.items.short());


myBox.items.list().map(item => item).forEach((item) => {
    toni.items.add(item);
    myBox.items.remove(item.name.get());
});


console.log(`------- ${toni.name.get()} Summary:`);
console.log('short', toni.summary.short());
console.log('get', toni.summary.get());
console.log('long', toni.summary.long());
console.log('items get', toni.summary.items.get());
console.log('items short', toni.summary.items.short());
