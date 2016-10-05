
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
            groupSum = group.summary.get(),
            name = matches[2].trim(),
            doors = place.doors.list('name', name);

        if (!doors.length) {
            return `${player} could not find ${name}.`;
        }

        let door = doors[0];

        if(!door.open.get()) {
            return `${name} ist not open yet.`;
        }

        console.log(JSON.stringify(groupSum.members , null, 2));

        const /*interruptions = template.interrupt({
                group: groupSum,
                member: groupSum.members[Math.floor(Math.random() * groupSum.members.length)].name
            }, Math.ceil(Math.random() * 5)),*/
            foundPlace = door.path.get()
                        .places.list()
                        .filter(x => x.name.get() !== place.name.get());

        let speed = group.info.average('speed'),
            delay = (door.path.get().distance.get() / speed) * 60 * 60 * 1000;

        //console.log(JSON.stringify(interruptions , null, 2));

        return [
            { action: 'disable' },
            { action: 'message', delay: 500, text: template.start({
                group: group.summary.get(),
                place: place.summary.get()
            }) },
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
            { action: 'message', delay: delay + 500, text: template.success({
                group: group.summary.get(),
                place: foundPlace[0].summary.get()
            }) },
            { action: 'enable', delay: delay + 500 }
        ];

    } else {
        return [ `${player} is not a registered player.` ];
    }
};