
import {itemTransfer} from '../actions';

export const cmdRegExp = /^(pick|pickup|pick up) (\S[ \S]*\S) (>) (\S[ \S]*\S)$/;

export const run = (player, command, world) => {

    if (!world.currentPlace) {
        return [ `world is not initialized .. yet.` ];
    } else if (world.getPlayers(player).length > 0) {

        const matches = cmdRegExp.exec(command),
            activePlayer = world.getPlayers(player)[0],
            from = matches[2],
            item = matches[4];

        const foundBox = world.places[world.currentPlace].boxes.list('name', from);

        if(!foundBox.length) {
            return `${from} is not available at ${world.places[world.currentPlace].name.get()}.`;
        }

        const foundItem = foundBox[0].items.list('name', item);

        if(!foundItem.length) {
            return `${item} is not available at ${from}.`;
        }

        const itemPicked = itemTransfer(foundBox[0], activePlayer, foundItem[0].id.get());

        if(itemPicked) {
            return `${player} picked up ${item} from ${from}.\n\nNew inventory:\n${JSON.stringify(activePlayer.summary.items.short(), null, 2)}`;
        }
        return `${player} could not pick up ${item} from ${from}.`;

    } else {
        return [ `${player} is not a registered player.` ];
    }
};
