
export const cmdRegExp = /^(stop)$/;

export const run = (player, command, world) => {
    if (!world.playerGroup) {
        return [ `no group started .. yet.` ];
    } else if (world.getPlayers(player).length > 0) {
        world.reset();
        return [ `${player} stopped the game.` ]; // this should never fail
    } else {
        return [ `${player} is not a registered player.` ];
    }
};
