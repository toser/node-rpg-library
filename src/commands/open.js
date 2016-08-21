
import {openBox} from '../actions';
import * as templateBox from './templates/openBox';

export const cmdRegExp = /^(open|o) (\S[ \S]+\S)+$/;

export const run = (player, command, world) => {

    if (!world.currentPlace) {
        return [ `world is not initialized .. yet.` ];
    } else if (world.getPlayers(player).length > 0) {

        const matches = cmdRegExp.exec(command),
            place = world.places[world.currentPlace],
            activePlayer = world.getPlayers(player)[0],
            name = matches[2].trim(),
            foundBox = place.boxes.list('name', name);

        if(!foundBox.length) {
            return templateBox.fail({
                player: activePlayer.summary.get(),
                boxName: name,
                place: place.summary.get()
            }, 'availability');
        }

        const boxOpened = openBox(foundBox[0], activePlayer);

        if(boxOpened.success) {
            return templateBox.success({
                player: activePlayer.summary.get(),
                box: foundBox[0].summary.short(),
                items: foundBox[0].summary.items.get()
            });
        }
        return templateBox.fail({
                player: activePlayer.summary.get(),
                boxName: name,
                place: place.summary.get()
            }, boxOpened.error);

    } else {
        return [ `${player} is not a registered player.` ];
    }
};
