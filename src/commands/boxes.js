
export const cmdRegExp = /^(boxes|box|b) *(\S[ \S]+\S){0,1}$/;

export const run = (player, command, world) => {
    if (world.getPlayers(player).length > 0) {
        return [ world.places[world.currentPlace].summary.boxes.get() ]; // this should never fail
    } else {
        return [ `${player} is not a registered player` ];
    }
};
