
import {itemTransfer} from '../actions';
import * as template from './templates/drop';

export const cmdRegExp = /^(drop) (\S[ \S]*\S) (>) (\S[ \S]*\S)$/;

export const run = (player, command, world) => {

    if (!world.currentPlace) {
        return [ `world is not initialized .. yet.` ];
    } else if (world.getPlayers(player).length > 0) {

        const matches = cmdRegExp.exec(command),
            activePlayer = world.getPlayers(player)[0],
            place = world.places[world.currentPlace],
            to = matches[4],
            item = matches[2];

        const foundBox = place.boxes.list('name', to);

        if(!foundBox.length) {

            return template.fail({
                toName: to,
                place: place.summary.get(),
                from: activePlayer.summary.get()
            }, 'box unavailable');
        }

        const foundItem = activePlayer.items.list('name', item);

        if(!foundItem.length) {

            return template.fail({
                from: activePlayer.summary.get(),
                to: foundBox[0].summary.get(),
                itemName: item
            }, 'item unavailable');
        }

        const itemDroped = itemTransfer(activePlayer, foundBox[0], foundItem[0].id.get());

        if(itemDroped.success) {

            return template.success({
                from: activePlayer.summary.get(),
                to: foundBox[0].summary.get(),
                item: foundItem[0].summary.get(),
                place: place
            });
        }

        return template.fail({
            from: activePlayer.summary.get(),
            to: foundBox[0].summary.get(),
            item: foundItem[0].summary.get(),
            place: place
        }, itemDroped.error);

    } else {
        return [ `${player} is not a registered player.` ];
    }
};
