'use strict';

var _player = require('./player');

var player = _interopRequireWildcard(_player);

var _item = require('./item');

var item = _interopRequireWildcard(_item);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

console.log(item.newItem(item.types.WEAPON, 'sword'));
console.log(player.newPlayer('Toni', 'cat'));

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