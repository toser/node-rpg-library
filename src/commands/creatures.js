
import * as template from './templates/creatures';

export const cmdRegExp = /^(who is here|who|creatures) *(\S[ \S]+\S){0,1}$/;

export const run = (player, command, world) => {
    if (!world.currentPlace) {
        return [ `world is not initialized .. yet.` ];
    } else if (world.getPlayers(player).length > 0) {

        const place = world.places[world.currentPlace];

        if (place.explored.get()) {
            return template.success({
                place: place.summary.get(),
                creatures: place.summary.creatures.long()
            });
        }
        return template.fail({
            place: place.summary.get()
        });

    } else {
        return [ `${player} is not a registered player.` ];
    }
};
