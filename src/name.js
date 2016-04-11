import {WeightedSelection, randomInt} from 'random-tools';

export const createName = (names) => {

    const ran1To2 = new WeightedSelection({
        '1': 1,
        '0': 2
    }), ran1To1 = new WeightedSelection({
        '1': 1,
        '0': 1
    }), ran2To1 = new WeightedSelection({
        '1': 2,
        '0': 1
    });

    let name = '';

    if (!!parseInt(ran2To1.random())) {
        name += names.pre1[randomInt(names.pre1.length - 1)] + ' ';
    }

    if (!!parseInt(ran1To2.random())) {
        name += names.pre2[randomInt(names.pre2.length - 1)] + ' ';
    }

    name += names.main[randomInt(names.main.length - 1)] + ' ';

    if (!!parseInt(ran1To2.random())) {
        name += names.post[randomInt(names.post.length - 1)] + ' ';
    }

    return name.trim()

};