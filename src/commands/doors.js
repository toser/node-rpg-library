
import * as template from './templates/doors';

export const cmdRegExp = /^(doors|door|d)$/;

export const run = (player, command, world) => {
    if (!world.currentPlace) {
        return [ `world is not initialized .. yet.` ];
    } else if (world.getPlayers(player).length > 0) {

        const place = world.places[world.currentPlace],
            group = world.playerGroup;

        if (place.explored.get()) {
            return template.success({
                place: place.summary.get(),
                doors: place.summary.doors.get(),
                speed: group.info.average('speed')
            });
        }
        return template.fail({
            place: place.summary.get()
        });

    } else {
        return [ `${player} is not a registered player.` ];
    }
};
