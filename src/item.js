import {getConfig, copyObject} from 'helptos';

const config = getConfig('../config/item.json', __dirname);

export let newItem = (type, name) => {

    let state = getFirstByType(copyObject(config).templates, type);

    console.log(state);
};