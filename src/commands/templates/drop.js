
import {getConfig} from 'helptos';

const symbols = getConfig('../../../config/symbols.json', __dirname);

export function success(data) {
    return `${data.from.name} droped ${data.item.name} to ${data.to.name}`;
}

export function fail(data, type) {

    switch(type) {
        case 'box unavailable':
            return `${data.from.name} could not find ${data.toName} at ${data.place.name}.`;
        case 'item unavailable':
            return `${data.from.name} don't have ${data.itemName} in the inventory.`;
        case 'from open':
            return `${data.from.name} is not open yet.`;
        case 'to open':
            return `${data.to.name} is not open yet.`;
        case 'rank':
            return `The rank of ${data.to.name} (${symbols.propertie.rank}${data.to.rank}) is not high enough to drop ${data.item.name} (${symbols.propertie.rank}${data.item.rank})`;
        case 'slots':
            return `${data.to.name} (${symbols.propertie.slots}${data.to.slots}) has not enough slots free to drop ${data.item.name} (${symbols.propertie.slots}${data.to.slots})`;
        default:
            return `${data.from.name} can not drop ${data.item.name} into ${data.to.name}`;
    }
}
