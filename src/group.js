import {getConfig, copyObject, getFirstByType} from 'helptos';
import * as properties from './properties';

const config = getConfig('../config/team.json', __dirname);

const name = state => Object.assign({}, properties.mixed('name', state, state));

const members = state => ({

    list: () => state.players,
    add: (member) => {

        state.members.push(member);

        return state.element;
    },

    // ToDo: implement properties.removeFromList here -> see box.items.remove()
    remove: () => {


        // ToDo: remove team

        return state.element;
    }

});


export const newGroup = (name) => {

    let state = copyObject(config);

    state.name = name;

    state.element = {
        name: name(state),
        members: members(state)
    };

    return state.element;
};