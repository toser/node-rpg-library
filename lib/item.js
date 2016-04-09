'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.types = exports.newItem = undefined;

var _helptos = require('helptos');

var config = (0, _helptos.getConfig)('../config/item.json', __dirname);

var newItem = exports.newItem = function newItem(type, name) {

    var state = (0, _helptos.getFirstByType)((0, _helptos.copyObject)(config).templates, type);

    console.log(state);
};

var types = exports.types = {
    WEAPON: 'weapon',
    ARMOR: 'armor',
    CONSUMABLE: 'consumable'
};