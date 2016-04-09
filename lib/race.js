'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRace = undefined;

var _helptos = require('helptos');

var config = (0, _helptos.getConfig)('../config/race.json', __dirname);

var getRace = exports.getRace = function getRace(name) {
  return (0, _helptos.getFirstByName)((0, _helptos.copyObject)(config).types, name);
};