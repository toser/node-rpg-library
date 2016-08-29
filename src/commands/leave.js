
import {leave} from '../actions';
import * as template from './templates/drop';

export const cmdRegExp = /^(leave|l) (\S[ \S]+\S)+$/;

export const run = (player, command, world) => {

    if (!world.currentPlace) {
        return [ `world is not initialized .. yet.` ];
    } else if (world.getPlayers(player).length > 0) {

        const matches = cmdRegExp.exec(command),
            place = world.places[world.currentPlace],
            group = world.playerGroup,
            name = matches[2].trim(),
            doors = place.doors.list('name', name);

        if (!doors.length) {
            return `${player} could not find ${name}.`;
        }

        let door = doors[0];

        if(!door.open.get()) {
            return `${name} ist not open yet.`;
        }

        leave({
            world,
            group,
            place,
            door
        });

        return `leaved`;

    } else {
        return [ `${player} is not a registered player.` ];
    }
};