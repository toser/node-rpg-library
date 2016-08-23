
import {getConfig} from 'helptos';

const symbols = getConfig('../../../config/symbols.json', __dirname);

export function success(data) {
    return `${data.player.name} opened ${data.door.name}

--${data.door.path.name.split().map(x => "-")}--
| ${data.door.path.name}.  \\n
| ${data.door.path.length}m  /\n
--${data.door.path.name.split().map(x => "-")}--`;
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
