import * as player from '../player';
import * as race from '../race';
import * as template from './templates/character';

const characters = race.getRaces().map(x => player.createPlayer(x, x).summary.get());

export const cmdRegExp = /^(character|char|c) *(\S+){0,1}$/; // " *" vs ( \S+)   :-(

export const run = (playerName, command, world) => {
    if (!world.playerGroup) {
        return [ `no group for players started .. yet.` ];
    } else if (world.getPlayers(playerName).length > 0) {
        return [ `character "${playerName}" already exists!` ];
    } else {
        let matches = cmdRegExp.exec(command),
            selectedRace = matches[2] ? matches[2].trim() : null;
        if (!race || race.getRaces().indexOf(selectedRace) === -1){ // no or wrong race chosen

            return template.fail({
                characters: characters,
                playerName: playerName
            });
        }

        let character = player.createPlayer(playerName, selectedRace);
        world.playerGroup.members.add(character);

        return template.success({
            character: character.summary.get(),
            group: world.playerGroup.summary.get()
        });
    }
};
