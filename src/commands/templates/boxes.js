import {getConfig} from 'helptos';

const symbols = getConfig('../../../config/symbols.json', __dirname);

export function success(data) {

    const boxList = data.boxes.map(box => {
        let openState = symbols.state.close,
            content = '';
        if(box.open) {
            openState = symbols.state.open;
            content = '\n   ' + box.items.map(item => {
                return symbols.itemType[item.type];
            }).join('');
        }
        return `${openState} "${box.name}"${content}`;
    }).join('\n\n');

    return `Boxes in ${data.place.name}:\n\n${boxList}`;
}

export function fail(data) {
    return `${data.place.name} is not explored yet.\n(Use "where are we" to explore)`;
}
