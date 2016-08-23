
import {getConfig} from 'helptos';

const symbols = getConfig('../../../config/symbols.json', __dirname);

export function success(data) {
    const pre = `${data.player.name} opened ${data.box.name}. It contains:\n\n`,
        content = data.items.map(item => {
            const base = `${symbols.itemType[item.type]} "${item.name}" ${symbols.propertie.rank}${item.rank} ${symbols.propertie.slots}${item.slots}\n   ${symbols.propertie.attack}${item.attack} ${symbols.propertie.defense}${item.defense} ${symbols.propertie.dexterity}${item.dexterity}`;
            let consume = '';

            if (item.type === 'consumable') {
                consume = ` ${symbols.propertie.health}${item.health} ${symbols.propertie.time}${item.time}sec`;
            }

            return `${base}${consume}`;
        }).join('\n\n');

    return `${pre}${content}`;
}

export function fail(data, type) {

    switch(type) {
        case 'availability':
            return `${data.player.name} could not find a box called "${data.boxName}" at ${data.place.name}.`;
        case 'dexterity':
            return `${data.player.name} is not dexterous enough to open ${data.boxName}.`;
        default:
            return `${data.player.name} can't open ${data.boxName}`;
    }
}
