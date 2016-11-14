import * as player from './player';
import * as creature from './creature';
import * as group from './group';
import * as box from './box';
import * as item from './item';
import * as place from './place';
import * as door from './door';
import * as path from './path';
import * as actions from './actions';


let attacker = player.createPlayer('toser', 'cat'),
    g = group.createGroup('ASD');

g.members.add(attacker);

let weapon = item.createWeapon(g.info.average()),
    defender = creature.createCreature(g.info.average()),
    armor = defender.items.listArmor();

if (armor) {
    armor = armor[0];
}

console.log('ARMOR', armor);

console.log(attacker.name.get(), attacker.health.get());
console.log(defender.name.get(), defender.health.get());
console.log(JSON.stringify(weapon.summary.get(), null, 2));
console.log(JSON.stringify(armor.summary.get(), null, 2));

actions.attack({
    attacker,
    defender,
    weapon,
    armor
});

console.log(attacker.name.get(), attacker.health.get());
console.log(defender.name.get(), defender.health.get());


