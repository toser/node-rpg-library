
export const cmdRegExp = /(pick|pickup|pick up|p) +(\S[\S ]+\S)/;
export const cmdRegVars = 2;

export const run = (player, command, world) => {
    return [ `${player} picks up *TODO*` ];
};
