'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.newItem = undefined;

var _helptos = require('helptos');

var config = (0, _helptos.getConfig)('../config/item.json', __dirname);

var newItem = exports.newItem = function newItem(type, name) {

    var state = getFirstByType((0, _helptos.copyObject)(config).templates, type);

    console.log(state);
};