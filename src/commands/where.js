
export const cmdRegExp = /^(where|where am i|where are we|w)$/;

export const run = (player, command, world) => {
    if (world.getPlayers(player).length > 0) {
        return [ world.places[world.currentPlace].summary.get() ]; // this should never fail
    } else {
        return [ `${player} is not a registered player` ];
    }
};
