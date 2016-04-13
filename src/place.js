import {EventEmitter} from 'events';
import {getConfig, copyObject} from 'helptos';
import * as properties from './properties';

const config = getConfig('../config/place.json', __dirname);

const name = state => Object.assign({}, properties.mixed('name', state, state));


const boxes = state => Object.assign({

        add: (box) => {

            state.boxes.push(box);
            
            state.element.event.emit('success', {
                        action: 'add box',
                        data: {
                            place: state.element,
                            box: box
                        }
                    });

            return state.element;
        },
        remove: properties.removeFromList(state, state.boxes,

            (success, box) => {

                if (success) {
                    state.element.event.emit('success', {
                        action: 'remove box',
                        data: {
                            place: state.element,
                            box: box
                        }
                    });
                }
                else {

                    state.element.event.emit('failure', {
                        action: 'remove box',
                        data: {
                            place: state.element,
                            box: box
                        }
                    });
                }

                return state.element;
            })
    },
    // get default list functionality
    properties.list(
        'boxes',
        state
    )
);

const groups = state => Object.assign({

        add: (group) => {

            state.groups.push(group);
            
            state.element.event.emit('success', {
                        action: 'add group',
                        data: {
                            place: state.element,
                            group: group
                        }
                    });

            return state.element;
        },
        remove: properties.removeFromList(state, state.groups,

            (success, group) => {

                if (success) {
                    state.element.event.emit('success', {
                        action: 'remove group',
                        data: {
                            place: state.element,
                            group: group
                        }
                    });
                }
                else {

                    state.element.event.emit('failure', {
                        action: 'remove group',
                        data: {
                            place: state.element,
                            group: group
                        }
                    });
                }

                return state.element;
            })
    },
    // get default list functionality
    properties.list(
        'groups',
        state
    )
);

const summary = state => ({
    
    get: () => {
        const place = state.element;
        
        return {
            name: place.name.get(),
            groups: place.groups.list().map(group => group.summary.short()),
            boxes: place.boxes.list().map(box => box.summary.short())   
        }; 
    },
    short: () => state.element.name.get(),
    boxes: {
        get: () => state.element.boxes.list().map(box => box.summary.get()),
        short: () => state.element.boxes.list().map(box => box.summary.short())
    },
    groups: {
        get: () => state.element.groups.list().map(group => group.summary.get()),
        short: () => state.element.groups.list().map(group => group.summary.short())
    }
    
});

export const newPlace = (name_in) => {

    let state = copyObject(config);

    state.name = name_in;

    state.element = {
        name: name(state),
        boxes: boxes(state),
        groups: groups(state),
        summary: summary(state),
        event: new EventEmitter()
    };

    return state.element;
};