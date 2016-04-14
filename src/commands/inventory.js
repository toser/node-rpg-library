
export const cmdRegExp = /^(inventory|inv|i) *(\S[ \S]+\S){0,1}$/;

export const run = (player, command, world) => {
    if (world.getPlayer(player)) {
        return [ world.getPlayer(player).summary.items.get() ]; // this should never fail
    } else {
        return [ `${player} is not a registered player` ];
    }
};
