'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.run = exports.cmdRegExp = undefined;

var _player = require('../player');

var Player = _interopRequireWildcard(_player);

var _race = require('../race');

var Race = _interopRequireWildcard(_race);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var cmdRegExp = exports.cmdRegExp = /^(register|reg|r) *(\S+){0,1}$/; // " *" vs ( \S+)   :-(

var run = exports.run = function run(player, command, world) {
    if (!world.playerGroup) {
        return ['no group for players started.'];
    } else if (world.getPlayers(player).length > 0) {
        return ['character "' + player + '" already exists'];
    } else {
        var matches = cmdRegExp.exec(command),
            race = matches[2] ? matches[2].trim() : null;
        if (!race || Race.getRaces().indexOf(race) === -1) // no or wrong race chosen
            return [player + ', choose a race: ' + Race.getRaces()];
        var character = Player.createPlayer(player, race);
        world.playerGroup.members.add(character);
        return ['character "' + player + '" created, may glory be with you! ' + player + ' joined "' + world.playerGroup.name.get() + '".', character.summary.short()];
    }
};