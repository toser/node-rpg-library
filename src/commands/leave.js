
import {leave} from '../actions';
import {randomInt} from 'random-tools';
import * as template from './templates/leave';

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

        const speed = group.info.average('speed'),
            delay = (door.path.get().distance.get() / speed) * 60 * 60 * 1000;

        if(!door.open.get()) {
            return `${name} ist not open yet.`;
        }

        return [
            { action: 'disable' },
            { action: 'message', delay: 500, text: 'start moving ' + delay },
            { action: 'delay',
                delay: delay,
                callback: () => {
                    leave({
                        world,
                        group,
                        place,
                        door
                    });
                }
            },
            { action: 'message', delay: delay, text: `done` },
            { action: 'enable', delay: delay }
        ];

    } else {
        return [ `${player} is not a registered player.` ];
    }
};