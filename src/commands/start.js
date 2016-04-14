
import * as Group from '../group';

export const cmdRegExp = /^(start) *(\S[ \S]+\S){0,1}$/;

export const run = (player, command, world) => {
    if (world.playerGroup) {
        return [ `group already exists! Named "${world.playerGroup.name.get()}"` ];
    }
    let matches = cmdRegExp.exec(command),
        group = matches[2] ? matches[2].trim() : null;
    if (!group) // no group-name given
        return [ `name your group, ${player}!` ];
    world.playerGroup = Group.newGroup(group);
    return [ `${player} started the group "${group}"! Let's see what adventure may lie upon you...` ];
};
