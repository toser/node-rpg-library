
import {getConfig} from 'helptos';

const symbols = getConfig('../../../config/symbols.json', __dirname);

export function success(data) {
    return `${data.to.name} picked up ${data.item.name} from ${data.from.name}`
}

export function fail(data, type) {

    switch(type) {
        case 'box unavailable':
            return `${data.to.name} could not find ${data.fromName} at ${data.place.name}.`;
        case 'item unavailable':
            return `${data.to.name} could not find ${data.itemName} in ${data.from.name}.`;
        case 'from open':
            return `${data.from.name} is not open yet.`;
        case 'to open':
            return `${data.to.name} is not open yet.`;
        case 'rank':
            return `The rank of ${data.to.name} (${symbols.propertie.rank}${data.to.rank}) is not high enough to pick up ${data.item.name} (${symbols.propertie.rank}${data.item.rank})`;
        case 'slots':
            return `${data.to.name} (${symbols.propertie.slots}${data.to.slots}) has not enough slots free to pick up ${data.item.name} (${symbols.propertie.slots}${data.item.slots})`;
        default:
            return `${data.to.name} can not pick up ${data.item.name} from ${data.from.name}`;
    }
}
