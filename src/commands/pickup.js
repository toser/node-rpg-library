
import {itemTransfer} from '../actions';
import * as template from './templates/pickup';

export const cmdRegExp = /^(pick|pickup|pick up) (\S[ \S]*\S) (>) (\S[ \S]*\S)$/;

export const run = (player, command, world) => {

    if (!world.currentPlace) {
        return [ `world is not initialized .. yet.` ];
    } else if (world.getPlayers(player).length > 0) {

        const matches = cmdRegExp.exec(command),
            activePlayer = world.getPlayers(player)[0],
            place = world.places[world.currentPlace],
            from = matches[2],
            item = matches[4];

        const foundBox = place.boxes.list('name', from);

        if(!foundBox.length) {

            return template.fail({
                fromName: from,
                place: place.summary.get(),
                to: activePlayer.summary.get()
            }, 'box unavailable');
        }

        const foundItem = foundBox[0].items.list('name', item);

        if(!foundItem.length) {

            return template.fail({
                from: foundBox[0].summary.get(),
                to: activePlayer.summary.get(),
                itemName: item
            }, 'item unavailable');
        }

        const itemPicked = itemTransfer(foundBox[0], activePlayer, foundItem[0].id.get());


        if(itemPicked.success) {

            return template.success({
                from: foundBox[0].summary.get(),
                to: activePlayer.summary.get(),
                item: foundItem[0].summary.get(),
                place: place
            });
        }

        return template.fail({
            from: foundBox[0].summary.get(),
            to: activePlayer.summary.get(),
            item: foundItem[0].summary.get(),
            place: place
        }, itemPicked.error);






        /*if(itemPicked) {
            return `${player} picked up ${item} from ${from}.\n\nNew inventory:\n${JSON.stringify(activePlayer.summary.items.short(), null, 2)}`;
        }
        return `${player} could not pick up ${item} from ${from}.`;*/

    } else {
        return [ `${player} is not a registered player.` ];
    }
};
