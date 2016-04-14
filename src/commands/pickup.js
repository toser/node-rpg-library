
export const cmdRegExp = /^(pick|pickup|pick up|p) *(\S[ \S]+\S){0,1}$/;

export const run = (player, command, world) => {
    return [ `${player} picks up *TODO*` ];
};
