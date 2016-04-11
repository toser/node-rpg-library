
import * as Player from '../player';

export const cmdRegExp = /register|r/; //TODO: pick race or random race
export const cmdRegVars = 0;

export const run = (player, command, world) => {
    if (player in world.players) {
        return [ `${player} already registered & created` ];
    } else {
        let character = world.players[player] = Player.newPlayer(player, 'cat'); //TODO: pick race or random race
        return [ `${player} registered`, `${character.describe()}` ];
    }
};
