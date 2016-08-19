
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