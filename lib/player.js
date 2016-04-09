'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.newPlayer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _race = require('./race');

var race = _interopRequireWildcard(_race);

var _helptos = require('helptos');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var skills = function skills(skill, _ref) {
    var _skills = _ref.skills;
    return {
        is: function is() {
            return _skills[skill];
        },
        up: function up() {
            var val = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
            return _skills[skill] = _skills[skill] + val;
        },
        down: function down() {
            var val = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
            return _skills[skill] = _skills[skill] - val;
        }
    };
};

var health = function health(player) {
    return _extends({}, skills('health', player));
},
    rank = function rank(player) {
    return _extends({}, skills('rank', player));
},
    attack = function attack(player) {
    return _extends({}, skills('attack', player));
},
    defense = function defense(player) {
    return _extends({}, skills('defense', player));
},
    dexterity = function dexterity(player) {
    return _extends({}, skills('dexterity', player));
},
    speed = function speed(player) {
    return _extends({}, skills('speed', player));
};

var slots = function slots(_ref2) {
    var _slots = _ref2.inventory.slots;
    return {
        total: function total() {
            return _slots.total;
        },
        free: function free() {
            return _slots.free;
        },
        add: function add() {
            var val = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

            _slots.total = _slots.total + val;
            _slots.free = _slots.free + val;

            return _slots.total;
        },
        remove: function remove() {
            var val = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];


            if (_slots.free - val < 0) {
                return false;
            }

            _slots.total = _slots.total - val;
            _slots.free = _slots.free - val;

            return _slots.total;
        },
        fill: function fill() {
            var val = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];


            if (_slots.free - val < 0) {
                return false;
            }

            return _slots.free = _slots.free - val;
        },
        empty: function empty() {
            var val = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];


            if (_slots.free + val > _slots.total) {
                return _slots.free = _slots.total;
            }

            return _slots.free = _slots.free + val;
        }
    };
};

var items = function items(player) {
    return {
        list: function list() {
            return player.inventory.items;
        },
        add: function add(item) {

            var playerSlots = slots(player),
                playerRank = rank(player);

            if (playerRank.is() < item.rank) {

                return {
                    error: 'rank',
                    item: item
                };
            }

            if (item.type === 'locked') {

                return {
                    error: 'type',
                    item: item
                };
            }

            if (playerSlots.fill(item.slots) === false) {
                return {
                    error: 'slots',
                    item: item
                };
            }

            player.inventory.items.push(item);

            return item;
        },
        remove: function remove(item) {

            // ToDo: remove item from inventory
            console.log('not implemented');

            return false;
        }
    };
};

var config = (0, _helptos.getConfig)('../config/player.json', __dirname);

var newPlayer = exports.newPlayer = function newPlayer(name, playerRace) {

    var state = (0, _helptos.copyObject)(config);

    state.name = name;
    state.race = _extends({}, race.getRace(playerRace));

    return {
        health: health(state),
        rank: rank(state),
        attack: attack(state),
        defense: defense(state),
        dexterity: dexterity(state),
        speed: speed(state),
        slots: slots(state),
        items: items(state)
    };
};