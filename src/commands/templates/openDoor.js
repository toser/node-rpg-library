
import {getConfig} from 'helptos';

const symbols = getConfig('../../../config/symbols.json', __dirname);

export function success(data) {

    const pathTo = data.door.path.places.filter(x => x !== data.place.name)[0];

    return `${data.player.name} opened the ${data.door.name} and sees:\nA ${data.door.path.length}m long ${data.door.path.name} to a ${pathTo}`;
}

export function fail(data, type) {

    switch(type) {
        case 'availability':
            return `${data.player.name} could not find a door called "${data.doorName}" at ${data.place.name}.`;
        case 'dexterity':
            return `${data.player.name} is not dexterous enough to open ${data.doorName}.`;
        default:
            return `${data.player.name} can't open ${data.doorName}`;
    }
}
