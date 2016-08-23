import * as path from './path';


/**
 * transfer an item from one thing to another
 * e.g. box to player, player to player, creature to player
 *
 * @param from
 * @param to
 * @param id
 * @returns {boolean}
 */
export const itemTransfer = (from, to, id) => {

    const foundItem = from.items.list('id', id);

    // [from] has item
    if(!foundItem.length){
        return {
            success: false,
            error: 'item unavailable'
        };
    }

    // get first found item
    const item = foundItem[0];

    // check if [from] has open property
    // if from.open is false return false
    if('open' in from &&
        !from.open.get()) {

        return {
            success: false,
            error: 'from open'
        };
    }

    // check if [to] has open property
    // if to.open is false return false
    if('open' in to &&
        !to.open.get()) {

        return {
            success: false,
            error: 'to open'
        };
    }

    // check if [to] and [item] has rank property
    // if [to]s rank is not high enougth return a fail
    if('rank' in to &&
        'rank' in item &&
        to.rank.get() < item.rank.get()) {

        return {
            success: false,
            error: 'rank'
        };
    }

    // check if [to] and [item] has slots property
    // if [to] has not enougth slots free return a fail
    if('slots' in to &&
        'slots' in item &&
        to.slots.free() < item.slots.get()) {

        return {
            success: false,
            error: 'slots'
        };
    }

    // add item to [to]s item list
    to.items.add(item);

    // check if [to] has the item now
    // then remove it from [from]s item list
    if(to.items.list('id', id).length) {
        from.items.remove(id);
        return {
            success: true
        };
    }
    else {
        return {
            success: false,
            error: 'unknown'
        };
    }
};

/**
 * get average dexterity of items in box
 * when player has higher dexterity as 75% of average item dexterity
 */
export const openBox = (box, player) => {

    const items = box.summary.items.get(),
        boxDexterity = (items.reduce((dex, item) => dex + item.dexterity, 0) / items.length) * .95;
    let canOpen = player.dexterity.get() >= boxDexterity;

    // always open when box is already open
    if(box.open.get()) {
        canOpen = true;
    }

    box.open.set(canOpen);

    if(canOpen) {
        return {
            success: true
        };
    }
    else {
        return {
            success: false,
            error: 'dexterity'
        }
    }
};


export const openDoor = ({door, player, place}) => {

    let canOpen = true; // ToDo: add conditions here

    if(door.open.get()) {
        canOpen = true;
    }

    door.open.set(canOpen);

    console.log('#### ', door.path);

    if(!door.path.get()){

        console.log("------->>", path.createPath({
                currentPlace: place
            }));

        door.path.set(path.createPath({
                currentPlace: place
            }));
    }

    if(canOpen) {
        return {
            success: true
        };
    }
    else {
        return {
            success: false,
            error: 'unknown'
        }
    }

};
