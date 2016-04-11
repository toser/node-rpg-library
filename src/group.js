import {EventEmitter} from 'events';
import {getConfig, copyObject, getFirstByType} from 'helptos';
import * as properties from './properties';

const config = getConfig('../config/group.json', __dirname);

const name = state => Object.assign({}, properties.mixed('name', state, state));

const members = state => Object.assign({

        add: (member) => {

            state.members.push(member);

            return state.element;
        },
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

    },
    // get default list functionality
    properties.list(
        'members',
        state
    )
);

const summary = state => ({

    get: () => {

        const group = state.element;

        return {
            name: group.name.get(),
            members: group.members.list().map(member => member.summary.short())
        };
    },
    short: () => {

        const group = state.element;

        return {
            name: group.name.get()
        };
    },
    members: {
        get: () => {

            const group = state.element;

            return group.members.list().map(member => member.summary.get());
        },
        short: () => {

            const group = state.element;

            return group.members.list().map(member => member.summary.short());
        },
        long: () => {

            const group = state.element;

            return group.members.list().map(member => member.summary.long());
        }
    }

});


export const newGroup = (groupName) => {

    let state = copyObject(config);

    state.name = groupName;

    state.element = {
        name: name(state),
        members: members(state),
        summary: summary(state),
        event: new EventEmitter()
    };

    return state.element;
};