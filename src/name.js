import {WeightedSelection, randomInt} from 'random-tools';
import {assign} from 'lodash';


function getWeightedSelection (weight) {

    if (weight === true) {
        return () => 1;
    }

    if (weight === false) {
        return () => 0;
    }

    if (typeof weight === 'string' &&
        weight.split('/').length >= 2) {

        const weightArr = weight.split('/'),
            selection = new WeightedSelection({
                '1': weightArr[0],
                '0': weightArr[1]
            });
        return () => selection.random();
    }

    return () => 0;
}


export const createName = (names, _weight) => {

    const defaultWeight = {
            pre1: '1/2',
            pre2: '2/1',
            main: true,
            post: '1/2'
        },
        weight = assign({}, defaultWeight, _weight),
        randomPre1 = getWeightedSelection(weight.pre1),
        randomPre2 = getWeightedSelection(weight.pre2),
        randomMain = getWeightedSelection(weight.main),
        randomPost = getWeightedSelection(weight.post);

    let name = '';

    if (names.pre1.length && !!parseInt(randomPre1())) {
        name += names.pre1[randomInt(names.pre1.length - 1)] + ' ';
    }

    if (names.pre2.length && !!parseInt(randomPre2())) {
        name += names.pre2[randomInt(names.pre2.length - 1)] + ' ';
    }

    if (names.main.length && !!parseInt(randomMain())) {
        name += names.main[randomInt(names.main.length - 1)] + ' ';
    }

    if (names.post.length && !!parseInt(randomPost())) {
        name += names.post[randomInt(names.post.length - 1)] + ' ';
    }

    return name.trim()
};