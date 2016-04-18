
/**
 * transfer an item from one thing to another 
 * e.g. box to player, player to player, creature to player
 * 
 * @param from
 * @param to
 * @param name
 * @returns {boolean}
 */
export const itemTransfer = (from, to, id) => {
    
    let item = from.items.list('id', id);
    
    if(!item.length){
        return false;
    }
    
    item = item[0];
    
    to.items.add(item);
    
    if(!to.items.list('id', id).length) {
        return false;
    }
    else {
        from.items.remove(id);
    }
    
    return true;
};