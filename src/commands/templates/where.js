
export function success(data) {

    const numGroups = data.place.groups.length,
        numBoxes = data.place.boxes.length,
        numDoors = data.place.doors.length,
        weapons = data.weapons.filter(x => x.type === 'weapon');

    // default texts
    let textWeapon = `only armed with fists and a threatening expression in the face.`,
        textGroups = `we are alone in this place. You can pack away your weapons and take a deep breath. It is save in here.`,
        textBoxes = `There is nothing to find in here. No chests, boxes or anything else.`,
        textDoors = ``;

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
        textBoxes = `I've found a ${data.place.boxes[0].name}. Maybe we find something useful in it.`
    }
    else if(numBoxes > 1) {
        const boxList = data.place.boxes.reduce((list, item) => `${list} a ${item.name},`, '').slice(0, -1).trim();
        textBoxes = `I've found:\n${boxList}.\nMaybe we find something useful in there.`
    }

    if(numDoors === 1) {
        textDoors = `There is one way out of this place. You see that ${data.place.doors[0].name}?`;
    }
    else if(numDoors > 1) {
        const doorList = data.place.doors.reduce((list, item) => `${list} a ${item.name},`, '').slice(0, -1).trim();
        textDoors = `There are several ways out of this place:\n${doorList}.`;
    }

    let textIntro = `${data.player.name} slowly inspects the ${data.place.name}. Sneaking around and looking in all corners of this place, ${textWeapon}
After a few moments ${data.player.name} turns to ${data.group.name}, and says: "Fellows, ${textGroups}`;

    return [
        { action:'disable' },
        { action:'message', delay:500, text:`${textIntro}` },
        { action:'message', delay:2000, text:`${textBoxes}` },
        { action:'message', delay:4000, text:`${textDoors}` },
        { action:'enable', delay:4100 }
    ];
}