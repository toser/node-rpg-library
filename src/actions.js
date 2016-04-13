
/**
 * transfer an item from one thing to another 
 * e.g. box to player, player to player, creature to player
 * 
 * @param from
 * @param to
 * @param name
 * @returns {boolean}
 */
export const itemTransfer = (from, to, name) => {
    
    const item = from.items.list().filter(item => item.name.get() === name)[0];
    
    if(!item){
        return false;
    }
    
    to.items.add(item);
    from.items.remove(name);
    
    return true;
};