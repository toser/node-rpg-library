
import {openBox} from '../actions';

export const cmdRegExp = /^(open|o) (\S[ \S]+\S)+$/;

export const run = (player, command, world) => {

    if (!world.currentPlace) {
        return [ `world is not initialized .. yet.` ];
    } else if (world.getPlayers(player).length > 0) {

        const matches = cmdRegExp.exec(command),
            activePlayer = world.getPlayers(player)[0],
            name = matches[2].trim(),
            foundBox = world.places[world.currentPlace].boxes.list('name', name);

        if(!foundBox.length) {
            return `${name} is not available.`;
        }

        const boxOpened = openBox(foundBox[0], activePlayer);

        if(boxOpened) {
            return `${player} opened ${name}, containing: \n ${JSON.stringify(foundBox[0].summary.items.get(), null, 2)}`;
        }
        return `${player} could not open ${name}.`;

    } else {
        return [ `${player} is not a registered player.` ];
    }
};
