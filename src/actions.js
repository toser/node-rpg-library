
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

    let item = from.items.list('id', id);

    // check if [from] has open property
    // if from.open is false return false
    if('open' in from && !from.open.get()) {
        return false
    }
    // check if [to] has open property
    // if to.open is false return false
    if('open' in to && !to.open.get()) {
        return false
    }

    // [from] has item
    if(!item.length){
        return false;
    }

    // add item to [to]s item list
    to.items.add(item[0]);

    // check if [to] has the item now
    // then remove it from [from]s item list
    if(to.items.list('id', id).length) {
        from.items.remove(id);
        return true;
    }
    else {
        return false;
    }
};

/**
 * get average dexterity of items in box
 * when player has higher dexterity as 75% of average item dexterity
 */
export const openBox = (box, player) => {

    const items = box.summary.items.get(),
        boxDexterity = (items.reduce((dex, item) => dex + item.dexterity, 0) / items.length) * .75,
        canOpen = player.dexterity.get() >= boxDexterity;

    box.open.set(canOpen);
    return canOpen;
};
