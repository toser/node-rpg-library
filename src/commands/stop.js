
export const cmdRegExp = /^(stop)$/;

export const run = (player, command, world) => {
    if (!world.playerGroup) {
        return [ `no group for players started.` ];
    } else if (world.getPlayers(player).length > 0) {
        let group = world.playerGroup.name.get()
        world.playerGroup = null;
        return [ `${player} stopped group "${group}"` ]; // this should never fail
    } else {
        return [ `${player} is not a registered player` ];
    }
};
