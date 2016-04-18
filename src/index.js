import * as player from './player';
import * as group from './group';
import * as box from './box';
import * as place from './place';
import * as actions from './actions';


let toni = player.createPlayer('Toni', 'cat'),
    tom = player.createPlayer('Tom', 'dog'),
    basti = player.createPlayer('Bastl', 'cat'),
    myGroup = group.createGroup('Fighter of Glory');
    
let myBox = box.createBox();

let myPlace = place.createPlace('Home of the brave');

toni.rank.up(3);
tom.attack.up(15);

myGroup.members.add(toni)
        .members.add(tom)
        .members.add(basti);
            
console.log(myGroup.info.average());
console.log(myGroup.info.min());
console.log(myGroup.info.max());

console.log(myGroup.info.average('defense'));
console.log(myGroup.info.min('rank'));
console.log(myGroup.info.max('rank'));
            

myPlace.boxes.add(myBox);
myPlace.groups.add(myGroup);


/*console.log('box----: \n', JSON.stringify(myBox.summary.items.short(), null, 2));
console.log('toni----: \n', JSON.stringify(toni.summary.items.short(), null, 2));

actions.itemTransfer(myBox, toni, myBox.items.list()[0].id.get());

console.log('box----: \n', JSON.stringify(myBox.summary.items.short(), null, 2));
console.log('toni----: \n', JSON.stringify(toni.summary.items.short(), null, 2));*/


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