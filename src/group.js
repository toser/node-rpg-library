import {getConfig, copyObject, getFirstByType} from 'helptos';
import * as properties from './properties';

const config = getConfig('../config/team.json', __dirname);

const name = state => Object.assign({}, properties.mixed('name', state, state));

const members = state => ({

    list: () => state.members,
    add: (member) => {

        state.members.push(member);

        return state.element;
    },

    // ToDo: implement properties.removeFromList here -> see box.items.remove()

    remove: properties.removeFromList(state, state.members,

        (success, member) => {

            if (success) {
                state.element.event.emit('success', {
                    action: 'remove member',
                    data: {
                        team: state.element,
                        member: member
                    }
                });
            }
            else {

                state.element.event.emit('failure', {
                    action: 'remove member',
                    data: {
                        team: state.element,
                        member: member
                    }
                });
            }

            return state.element;
        })

});


export const newGroup = (groupName) => {

    let state = copyObject(config);

    state.name = groupName;

    state.element = {
        name: name(state),
        members: members(state)
    };

    return state.element;
};