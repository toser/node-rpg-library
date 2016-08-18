




export const template = function (data) {

    console.log(JSON.stringify(data,null,2));

    const numGroups = data.place.groups.length,
        numBoxes = data.place.boxes.length,
        weapons = data.weapons.filter(x => x.type === 'weapon');

    // default texts
    let textWeapon = `only armed with fists and a threatening expression in the face.`,
        textGroups = `we are alone in this place. You can pack away your weapons and take a deep breath. It is save in here.`,
        textBoxes = `There is nothing to find in here. No chests, boxes or anything else.`;

    if(weapons.length) {
        textWeapon = `ready to defend the group with the ${weapons[0].name}.`;
    }

    if(numGroups === 2) {
        textGroups = `be quiet now. I see one other group in the back of ${data.place.name}. Keep your weapons ready. We might need to fight.`;
    }
    else if(numGroups > 2){
        textGroups = `be quiet now. I see ${numGroups} other group in here. Keep your weapons ready. We might need to fight.`;
    }

    if(numBoxes === 1) {
        textBoxes = `I've found a ${data.place.boxes[0].name}. Maybe we find something usefull in it.`
    }
    else if(numBoxes > 1) {
        const boxList = data.place.boxes.reduce((list, item) => `${list} a ${item.name},`, '').slice(0, -1).trim();
        textBoxes = `I've found ${boxList}. Maybe we find something useful in there.`
    }



    return (
`${data.player.name} slowly inspects the ${data.place.name}. Sneaking around and looking in all corners of this place, ${textWeapon}
After a few moments ${data.player.name} turns to ${data.group.name}, and says: "Fellows, ${textGroups}
${textBoxes}"`);

}