
export const cmdRegExp = /(inventory|inv|i) *(\S[\S ]+\S)/;
export const cmdRegVars = 2;

export const run = (player, command, world) => {
    return [ `${player}'s inventory: *TODO*` ];
};
