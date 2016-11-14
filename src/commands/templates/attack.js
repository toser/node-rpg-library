
import {getConfig} from 'helptos';

const symbols = getConfig('../../../config/symbols.json', __dirname);

export function success(data) {

    let constent = `${data.attacker.name} attacks ${data.defender.name} with ${data.weapon.name}
${symbols.presentational.redDown}${data.power - data.defense} ${data.defender.name} ${symbols.propertie.health}${data.defender.health}`;

    return constent;
}

export function fail(data, type) {

    switch(type) {
        case 'not found':
            return `${data.playerName} could not find ${data.weaponName}.`;
        case 'not found creature':
            return `${data.playerName} could not find ${data.creatureName} in ${data.placeName}.`;
        case 'defended':
            return `${data.defender.name} defended the attack. `;
        default:
            return `FEHL -,-`;
    }
}
