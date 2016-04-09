import {getConfig, getFirstByName, copyObject} from 'helptos';


let config = getConfig('../config/race.json', __dirname);

export let getRace = name => getFirstByName(copyObject(config).types, name);