
import * as template from './templates/boxes';

export const cmdRegExp = /^(boxes|box|b) *(\S[ \S]+\S){0,1}$/;

export const run = (player, command, world) => {
    if (!world.currentPlace) {
        return [ `world is not initialized .. yet.` ];
    } else if (world.getPlayers(player).length > 0) {

        const place = world.places[world.currentPlace];

        if (place.explored.get()) {
            return template.success({
                place: place.summary.get(),
                boxes: place.summary.boxes.get()
            });
        }
        return template.fail({
            place: place.summary.get()
        });

    } else {
        return [ `${player} is not a registered player.` ];
    }
};
