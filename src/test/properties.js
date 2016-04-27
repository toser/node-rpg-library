import {expect} from 'chai';
import {numerical} from '../lib/properties';

describe('properties', () => {
    
    describe('numerical', () => {
        
        describe('get', () => {
            
            /**
             * ToDo: move this to a mock
             */
            const state = {
                health: 100,
                subElement: {
                    attack: 30
                }
            };

            it('should return the correct value for a property', () => {
                const health = numerical('health', state).get();
                const attack = numerical('attack', state.subElement, state).get();
                expect(health).to.equal(100);
                expect(attack).to.equal(30);
            });

            it('should return undefined if property is not present', () => {
                const age = numerical('age', state).get();
                const gender = numerical('gender', state.subElement, state).get();
                expect(age).to.equal(undefined);
                expect(gender).to.equal(undefined);
            });
            
        });
    });
});