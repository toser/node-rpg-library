import {getConfig} from 'helptos';

const symbols = getConfig('../../../config/symbols.json', __dirname);

function interruptionMsg(data) {

    return [
        ``
    ]
};

export function start(data) {
    return `${data.group.name} leaves the ${data.place.name}.`;
}

export function success(data) {
    return `${data.group.name} arrived in a ${data.place.name}. Let's see what we will find in here.`;
}

export function interrupt(data, count) {

    if (!count) {
        return `${data.member}`;
    }

    let messages = [];

    for (let i = 0; i < count; i++) {
        const member = groupSum.members[Math.floor(Math.random() * groupSum.members.length)].name


    }


    return messages[0];
}
