import {getConfig} from 'helptos';

const symbols = getConfig('../../../config/symbols.json', __dirname);

export function success(data) {

    const doorList = data.doors.map(door => {
        let openState = symbols.state.close,
            content = '';
        if(door.open) {
            const pathTo = door.path.places.filter(x => x !== data.place.name)[0];
            const time = Math.round((door.path.distance / data.speed) * 60);
            openState = symbols.state.open;
            content = `\n   ${door.path.name} > ${pathTo}\n   ${symbols.state.walk} ${door.path.distance}km\n   ${symbols.presentational.clock} ${time}min`;
        }
        return `${openState} "${door.name}"${content}`;
    }).join('\n\n');

    return `Doors in ${data.place.name}:\n\n${doorList}`;
}

export function fail(data) {
    return `${data.place.name} is not explored yet.\n(Use "where are we" to explore)`;
}
