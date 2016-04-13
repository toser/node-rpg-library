import * as player from './player';
import * as group from './group';
import * as box from './box';
import * as place from './place';
import * as actions from './actions';


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

let myPlace = place.newPlace('Home of the brave');

myPlace.boxes.add(myBox);
myPlace.groups.add(myGroup);

console.log('box----: \n', JSON.stringify(myBox.summary.items.short(), null, 2));
console.log('toni----: \n', JSON.stringify(toni.summary.items.short(), null, 2));

actions.itemTransfer(myBox, toni, myBox.items.list()[0].name.get());

console.log('box----: \n', JSON.stringify(myBox.summary.items.short(), null, 2));
console.log('toni----: \n', JSON.stringify(toni.summary.items.short(), null, 2));


/*console.log(JSON.stringify(myPlace.summary.short(), null, 2));
console.log(JSON.stringify(myPlace.summary.get(), null, 2));
console.log(JSON.stringify(myPlace.summary.boxes.short(), null, 2));
console.log(JSON.stringify(myPlace.summary.boxes.get(), null, 2));
console.log(JSON.stringify(myPlace.summary.groups.short(), null, 2));
console.log(JSON.stringify(myPlace.summary.groups.get(), null, 2));*/

/*console.log(`------- ${myBox.name.get()} Summary:`);
 console.log('short', myBox.summary.short());
 console.log('get', myBox.summary.get());
 console.log('items get', myBox.summary.items.get());
 console.log('items short', myBox.summary.items.short());*/


/*myBox.items.list().map(item => item).forEach((item) => {
    toni.items.add(item);
    myBox.items.remove(item.name.get());
});*/


/*console.log(`------- ${toni.name.get()} Summary:`);
 console.log('short', toni.summary.short());
 console.log('get', toni.summary.get());
 console.log('long', toni.summary.long());
 console.log('items get', toni.summary.items.get());
 console.log('items short', toni.summary.items.short());*/


/*console.log(`------- ${myGroup.name.get()} Summary:`);
console.log('short', JSON.stringify(myGroup.summary.short(), null, 2));
console.log('get', JSON.stringify(myGroup.summary.get(), null, 2));
console.log('members get', JSON.stringify(myGroup.summary.members.get(), null, 2));
console.log('members short', JSON.stringify(myGroup.summary.members.short(), null, 2));
console.log('members long', JSON.stringify(myGroup.summary.members.long(), null, 2));*/