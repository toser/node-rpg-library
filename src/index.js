import * as player from './player';
import * as item from './item';


/*console.log(item.newItem(item.types.WEAPON, 'sword'));*/

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


toni.items.add(sword)
    .items.add(helmet)
    .items.list().forEach(
    item => {
        console.log(`${toni.name.get()} has a ${item.name.get()} with ${item.attack.get()} attack and ${item.defense.get()} defense points.`);
    });