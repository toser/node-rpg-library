
import * as template from './templates/inventory';

export const cmdRegExp = /^(inventory|inv|i) *(\S[ \S]+\S){0,1}$/;

export const run = (player, command, world) => {
    if (world.getPlayers(player).length > 0) {
        let players = world.getPlayers(player),
            output = [];




        players.forEach((e) => {
            output.push(player);
            output.push(e.summary.items.get());
        });
        return output; // this should never fail
    } else {
        return [ `${player} is not a registered player.` ];
    }
};
