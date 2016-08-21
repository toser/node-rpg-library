import * as player from './player';
import * as group from './group';
import * as box from './box';
import * as place from './place';
import * as actions from './actions';


let toni = player.createPlayer('Toni', 'cat'),
    tom = player.createPlayer('Tom', 'dog'),
    basti = player.createPlayer('Bastl', 'cat'),
    myGroup = group.createGroup('Fighter of Glory');


toni.rank.up(3);
tom.attack.up(15);
tom.dexterity.up(15);

myGroup.members.add(toni);
myGroup.members.add(tom);
myGroup.members.add(basti);


let myPlace = place.createPlace({
    group: myGroup
});


//console.log(myPlace.boxes.list()[0].items.list()[0].id.get());

const allBoxes = myPlace.boxes.list();

const firstBox = allBoxes[0];

//actions.openBox(firstBox, toni);

firstBox.open.set(true);

console.log('BOX OPEN?', firstBox.open.get());

const item = firstBox.items.list()[0];

//item.rank.up(100);
//item.slots.up(70);

console.log('ITEM:', `${item.name.get()} - rank ${item.rank.get()} - slots ${item.slots.get()}`);

console.log('TONI:', `${toni.name.get()} - rank ${toni.rank.get()} - slots ${toni.slots.get()}`);


console.log('PICK: ', actions.itemTransfer(firstBox, toni, item.id.get()).error);


/*console.log(firstBox.items.list()[0].name.get());
console.log(firstBox.items.list()[0].id.get());*/





/*actions.itemTransfer(firstBox, toni, firstBox.items.list()[0].id.get());


console.log(toni.summary.long());*/



//actions.itemTransfer(myPlace.boxes.list()[0].items.list()[0]);



//console.log(myPlace.summary.get());
