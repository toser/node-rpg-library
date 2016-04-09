import * as player from './player';
import * as item from './item';


/*console.log(item.newItem(item.types.WEAPON, 'sword'));*/

let p = player.newPlayer('Toni', 'cat'),
    i = item.newItem(item.types.WEAPON, 'sword');

p.event.on('failure', function (e) {

    console.log(`failure at ${e.action}`);
});

console.log(p.items.add({
        rank: 1,
        collectible: true,
        slots: 70
    })
    .health.down(200)
    .health.is());


/*console.log(
 p.rank.up(3)
 .rank.is()
 );

 console.log(
 p.slots.up(10)
 .slots.fill(7)
 .slots.free()
 );*/

/*let p1 = player.newPlayer('Toni', 'cat'),
 p2 = player.newPlayer('Basti', 'cat')c,
 p3 = player.newPlayer('Muh', 'dog');*/



/*console.log(p1.getRank(), p1.getAttack(), p1.getDefence(), p1.getSkill(), p1.getSpeed());*/

/*
 console.log('---- P1');
 console.log(p1.rank.is());
 console.log(p1.rank.up(3));
 console.log(p1.rank.is());
 console.log('---- P1');

 console.log('---- P2');
 console.log(p2.rank.is());
 console.log(p2.rank.up(17));
 console.log(p2.rank.is());
 console.log('---- P2');

 console.log('---- P1');
 console.log(p1.rank.is());
 console.log('---- P1');


 console.log(p1.slots.total(), p1.slots.free());
 console.log(p1.slots.add(4));
 console.log(p1.slots.total(), p1.slots.free());
 console.log(p1.slots.remove(10));
 console.log(p1.slots.total(), p1.slots.free());


 console.log(p1.slots.fill(15));
 console.log(p1.slots.free());
 console.log(p1.slots.empty(10));
 console.log(p1.slots.free());


 console.log(p1.slots.free());
 console.log(p1.items.add({rank: 1, slots: 3}));
 console.log(p1.slots.free());
 console.log(p1.items.list());
 */




