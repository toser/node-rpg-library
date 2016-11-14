import {getConfig} from 'helptos';

const symbols = getConfig('../../../config/symbols.json', __dirname);

export function success(data) {

    const creatureList = data.creatures.map(creature => {
        let dead = '',
            content = '';

        if (creature.dead) {
            dead = `${symbols.state.dead} `;

            if (creature.weapon.length) {
                const weapons = creature.weapon.map(weapon => `${symbols.itemType.weapon} ${weapon.name} ${symbols.propertie.rank}${weapon.rank} ${symbols.propertie.attack}${weapon.attack}`);
                content += `${weapons.join('\n')}\n`;
            }
            if (creature.armor.length) {
                const armors = creature.armor.map(armor => `${symbols.itemType.armor} ${armor.name} ${symbols.propertie.rank}${armor.rank} ${symbols.propertie.defense}${armor.defense}`);
                content += `${armors.join('\n')}\n`;
            }
            if (creature.consumable.length) {
                const consumables = creature.consumable.map(consumable => `${symbols.itemType.consumable} ${consumable.name} ${symbols.propertie.rank}${consumable.rank}`);
                content += `${consumables.join('\n')}\n`;
            }
        } else {
            content += `${symbols.propertie.rank} ${creature.rank} ${symbols.propertie.health} ${creature.health} ${symbols.propertie.attack} ${creature.attack} ${symbols.propertie.defense} ${creature.defense}\n`;
        }

        return `${dead}${symbols.race[creature.type]} ${creature.name} \n${content}`;
    }).join('\n');

    return `Creatures in ${data.place.name}:\n\n${creatureList}\n`;
}

export function fail(data) {
    return `${data.place.name} is not explored yet.\n(Use "where are we" to explore)`;
}
