import {EventEmitter} from 'events';
import {getConfig, copyObject, getFirstByType} from 'helptos';
import * as properties from './properties';

const config = getConfig('../config/group.json', __dirname);
const playerPropertyConfig = getConfig('../config/player.json', __dirname).properties;


const getPropertiesFromAllMembers = (members, baseProperties) => {
    
    return members.reduce((output, member) => {
            
            output = Object.keys(output).reduce((out, key) => {
                
                if(!(out[key] instanceof Array)){
                    out[key] = [];
                }
                
                out[key].push(member[key].get());
                return out;
            }, output);
            
            return output;
            
        }, baseProperties);
};

const name = state => Object.assign({}, properties.mixed('name', state));

const members = state => Object.assign({},
    // get default list functionality
    properties.list(
        'members',
        state
    )
);

/**
 * get infos from group by its member infos (eg. average from properties)
 */
const info = state => ({
    
    average: (property = false) => {
        
        const baseProperties = copyObject(playerPropertyConfig),
            group = state.element,
            memberCount = group.members.list().length;
            
        let average = getPropertiesFromAllMembers(group.members.list(), baseProperties);
        
        // get averages
        average = Object.keys(average).reduce((output, key) => {
            output[key] = Math.round(average[key].reduce((sum,val) => {return sum + val},0) / memberCount);
            return output;
        }, {});
        
        if(property){
            return average[property];
        }
        else {
            return average;
        }
    },
    min: (property = false) => {
        
        const baseProperties = copyObject(playerPropertyConfig),
            group = state.element;
        
        let min = getPropertiesFromAllMembers(group.members.list(), baseProperties);
        
        // get minimum
        min = Object.keys(min).reduce((output, key) => {
            output[key] = Math.min.apply(this, min[key]);
            return output;
        }, {});
        
        if(property){
            return min[property];
        }
        else {
            return min;
        }
    },
    max: (property = false) => {
        
        const baseProperties = copyObject(playerPropertyConfig),
            group = state.element;
        
        let max = getPropertiesFromAllMembers(group.members.list(), baseProperties);
        
        // get minimum
        max = Object.keys(max).reduce((output, key) => {
            output[key] = Math.max.apply(this, max[key]);
            return output;
        }, {});
        
        if(property){
            return max[property];
        }
        else {
            return max;
        }
    }
});

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
            return state.element.members.list().map(member => member.summary.get());
        },
        short: () => {
            return state.element.members.list().map(member => member.summary.short());
        },
        long: () => {
            return state.element.members.list().map(member => member.summary.long());
        }
    }

});


const newGroup = (groupName) => {

    let state = copyObject(config);

    state.name = groupName;

    state.element = {
        name: name(state),
        members: members(state),
        summary: summary(state),
        info: info(state),
        event: new EventEmitter()
    };

    return state.element;
};

export const createGroup = (groupName, creatureGroup) => {
    
    return newGroup(groupName);
};