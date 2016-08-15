
import * as Group from '../group';

export const cmdRegExp = /^(start)$/;

export const run = (player, command, world) => {
    if (!world.playerGroup) {
        return [ `no group exists!` ];
    } else if (world.getPlayers().length === 0) {
        return [ `no character in group!` ];
    }
    world.init();
    return [ `Good luck, have fun...` ];
};
