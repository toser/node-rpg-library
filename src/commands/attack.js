
import {attack} from '../actions';
import * as template from './templates/attack';

export const cmdRegExp = /^(attack|a) (\S[ \S]*\S) *(>) *(\S[ \S]*\S)$/;

export const run = (player, command, world) => {

    if (!world.currentPlace) {
        return [ `world is not initialized .. yet.` ];
    } else if (world.getPlayers(player).length > 0) {

        const matches = cmdRegExp.exec(command),
            activePlayer = world.getPlayers(player)[0],
            place = world.places[world.currentPlace],
            weaponName = matches[2],
            creatureName = matches[4];
        let weapon,
            creature,
            armor;

        weapon = activePlayer.items.listWeapon('name', weaponName);

        if(!weapon.length) {
            weapon = false;
            creature = place.creatures.list('name', weaponName);
            if(!creature.length) {
                return template.fail({
                    playerName: player,
                    weaponName
                }, 'not found');
            }
        } else {
            weapon = weapon[0];
            creature = place.creatures.list('name', creatureName);
            if(!creature.length) {
                return template.fail({
                    playerName: player,
                    creatureName,
                    placeName: place.name.get()
                }, 'not found creature');
            }
            creature = creature[0];
        }

        armor = creature.items.listArmor();

        if (armor.length === 1) {
            armor = armor[0];
        } else if (armor.length > 1)  {
            armor = armor[Math.round(Math.random() * (armor.length - 1))];
        } else {
            armor = false;
        }

        const fight = attack({
            attacker: activePlayer,
            defender: creature,
            weapon,
            armor
        });

        if (fight.success) {
            return template.success({
                attacker: activePlayer.summary.get(),
                defender: creature.summary.get(),
                power: fight.data.power,
                defense: fight.data.defense,
                weapon: weapon.summary.get(),
                armor: armor.summary.get()
            });
        }

        return template.fail({
                attacker: activePlayer.summary.get(),
                defender: creature.summary.get(),
                power: fight.data.power,
                defense: fight.data.defense,
                weapon: weapon.summary.get(),
                armor: armor.summary.get()
            }, 'defended');


    } else {
        return [ `${player} is not a registered player.` ];
    }
};
