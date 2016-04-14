
export const cmdRegExp = /^(group|g)$/;

export const run = (player, command, world) => {
     if (!world.playerGroup) {
        return [ `no group for players started.` ];
    } else if (world.getPlayer(player)) {
        return [ world.playerGroup.summary.get() ]; // this should never fail
    } else {
        return [ `${player} is not a registered player` ];
    }
};
