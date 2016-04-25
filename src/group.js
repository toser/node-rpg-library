import {EventEmitter} from 'events';
import {getConfig, copyObject, getFirstByType} from 'helptos';
import * as properties from './properties';

const config = getConfig('../config/group.json', __dirname);
const playerPropertyConfig = getConfig('../config/player.json', __dirname).properties;


const getPropertiesFromAllMembers = (members, baseProperties) => {
    
    return members.reduce((output, member) => {
            
            output = Object.keys(output).reduce((out, key) => {
                
                // for the first member create array for each property
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
        
        if(!state.element.members.list().length){
            return new Error(`the group ${state.element.name.get()} has no members.`);
        }
        
        const baseProperties = copyObject(playerPropertyConfig),
            members = state.element.members.list(),
            allMembersProperties = getPropertiesFromAllMembers(members, baseProperties),
            average = Object.keys(allMembersProperties).reduce((output, key) => {
                output[key] = Math.round(allMembersProperties[key].reduce((sum,val) => {
                    return sum + val
                },0) / members.length);
                return output;
            }, {});
            
        return property ? average[property] : average;
    },
    min: (property = false) => {
        
        if(!state.element.members.list().length){
            return new Error(`the group ${state.element.name.get()} has no members.`);
        }
        
        const baseProperties = copyObject(playerPropertyConfig),
            members = state.element.members.list(),
            allMembersProperties = getPropertiesFromAllMembers(members, baseProperties),
            min = Object.keys(allMembersProperties).reduce((output, key) => {
                output[key] = Math.min.apply(this, allMembersProperties[key]);
                return output;
            }, {});
        
        return property ? min[property] : min;
    },
    max: (property = false) => {
        
        if(!state.element.members.list().length){
            return new Error(`the group ${state.element.name.get()} has no members.`);
        }
        
        const baseProperties = copyObject(playerPropertyConfig),
            group = state.element,
            allMembersProperties = getPropertiesFromAllMembers(group.members.list(), baseProperties),
            max = Object.keys(allMembersProperties).reduce((output, key) => {
                output[key] = Math.max.apply(this, allMembersProperties[key]);
                return output;
            }, {});
        
        return property ? max[property] : max;
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