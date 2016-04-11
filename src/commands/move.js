
export const cmdRegExp = /(move|move to|m) +(east|west|north|south|left|right|up|down)/;
export const cmdRegVars = 2;

export const run = (player, command, world) => {
    return [ `${player} moves *TODO* (like Jagger?)` ];
};
