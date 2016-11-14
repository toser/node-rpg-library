
import * as template from './templates/where';

export const cmdRegExp = /^(explore)$/;

export const run = (player, command, world) => {
    if (!world.currentPlace) {
        return [ `world is not initialized .. yet.` ];
    } else if (world.getPlayers(player).length > 0) {

        const activePlayer = world.getPlayers(player)[0],
            place = world.places[world.currentPlace];

        place.explored.set(true);

        return template.success({
            player: activePlayer.summary.get(),
            weapons: activePlayer.summary.items.short(),
            group: world.playerGroup.summary.get(),
            place: world.places[world.currentPlace].summary.get()
        });

        //return [ world.places[world.currentPlace].summary.get() ]; // this should never fail
    } else {
        return [ `${player} is not a registered player.` ];
    }
};
