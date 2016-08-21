
import {getConfig} from 'helptos';

const symbols = getConfig('../../../config/symbols.json', __dirname);

export function success(data) {
    return `Character ${symbols.race[data.character.type]} ${data.character.name} joined ${data.group.name}, may glory be with you!`;
}

export function fail(data) {

    const characters = data.characters.map(character => {
        return `${symbols.race[character.type]} "${character.type}"\n   ${symbols.propertie.slots}${character.slots} ${symbols.propertie.attack}${character.attack} ${symbols.propertie.defense}${character.defense} ${symbols.propertie.dexterity}${character.dexterity} ${symbols.propertie.speed}${character.speed}`;
    }).join('\n\n');

    return `${data.playerName}, choose a race:\n\n${characters}`;
}
