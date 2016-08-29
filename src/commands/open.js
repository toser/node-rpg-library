
import {openBox, openDoor} from '../actions';
import * as templateBox from './templates/openBox';
import * as templateDoor from './templates/openDoor';

export const cmdRegExp = /^(open|o) (\S[ \S]+\S)+$/;

export const run = (player, command, world) => {

    if (!world.currentPlace) {
        return [ `world is not initialized .. yet.` ];
    } else if (world.getPlayers(player).length > 0) {

        const matches = cmdRegExp.exec(command),
            place = world.places[world.currentPlace],
            activePlayer = world.getPlayers(player)[0],
            name = matches[2].trim(),
            foundBox = place.boxes.list('name', name),
            foundDoor = place.doors.list('name', name);

        if(foundBox.length) {
            return openBoxAction({
                box: foundBox[0],
                activePlayer,
                place,
                name
            });
        }

        if(foundDoor.length) {
            return openDoorAction({
                door: foundDoor[0],
                activePlayer,
                place,
                name
            });
        }

        return templateBox.fail({
                player: activePlayer.summary.get(),
                boxName: name,
                place: place.summary.get()
            }, 'availability')
            + '\n' +
            templateDoor.fail({
                player: activePlayer.summary.get(),
                doorName: name,
                place: place.summary.get()
            }, 'availability');

    } else {
        return [ `${player} is not a registered player.` ];
    }
};


function openBoxAction({box, activePlayer, place, name}) {

    const boxOpened = openBox(box, activePlayer);

    if(boxOpened.success) {
        return templateBox.success({
            player: activePlayer.summary.get(),
            box: box.summary.short(),
            items: box.summary.items.get()
        });
    }
    return templateBox.fail({
            player: activePlayer.summary.get(),
            boxName: name,
            place: place.summary.get()
        }, boxOpened.error);
}

function openDoorAction({door, activePlayer, place, name}) {

    const doorOpened = openDoor({
        door,
        player: activePlayer,
        place});

    if(doorOpened.success) {
        return templateDoor.success({
            player: activePlayer.summary.get(),
            door: door.summary.get(),
            place: place.summary.get()
        });
    }
    return templateDoor.fail({
            player: activePlayer.summary.get(),
            doorName: name,
            place: place.summary.get()
        }, doorOpened.error);
}
