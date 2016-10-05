import * as player from './player';
import * as creature from './creature';
import * as group from './group';
import * as box from './box';
import * as place from './place';
import * as door from './door';
import * as path from './path';
import * as actions from './actions';


let toser = player.createPlayer('toser', 'cat'),
    g = group.createGroup('ASD');

g.members.add(toser);

console.log(g.info.average());

let v = creature.createCreature(g.info.average());

console.log(v.summary.long());




