import {capitalize} from 'helptos';

// -------------------------
// property function collections
// -------------------------

/**
 * basic getter and setter for numerical properties
 *
 * @param property
 * @param parent
 * @param state
 */
export const numerical = (property, parent, state = parent) => ({
    get: () => parent[property],
    up: (val = 1) => {
        parent[property] = parent[property] + val;
        return state.element;
    },
    down: (val = 1) => {
        parent[property] = parent[property] - val;
        return state.element;
    }
});

/**
 * get and set for mixed values
 *
 * @param property
 * @param parent
 * @param state
 */
export const mixed = (property, parent, state = parent) => ({
    get: () => parent[property],
    set: (val) => {
        if (val) {
            parent[property] = val;
        }
        return state.element;
    }
});

/**
 * get and set for boolean values
 *
 * @param property
 * @param parent
 * @param state
 */
export const boolean = (property, parent, state = parent) => ({
    get: () => parent[property],
    set: (val) => {
        if (val) {
            parent[property] = !!val;
        }
        return state.element;
    }
});

/**
 * get protected field
 *
 * @param property
 * @param parent
 * @param state
 */
export const fixed = (property, parent, state = parent) => ({
    get: () => parent[property]
});


/**
 * list default functions
 *
 * you can add default filters as own functions by passing an array of type filters
 * e.g.:
 * typeFilters = ['weapon']
 * will create a function listWeapon()
 * that will return a a filtered list of elements with type==='weapon'
 *
 *
 * @param property
 * @param parent
 * @param state
 * @param typeFilters
 * @returns {{list: (function())}}
 */
export const list = (property, parent, state = parent, typeFilters = []) => {

    let obj = {
        list: getList(parent[property])
    };

    typeFilters.forEach(filter => {
        obj[`list${capitalize(filter)}`] = getList(parent[property], filter);
    });

    return obj;
};


// -------------------------
// single property functions
// -------------------------

/**
 * remove element from array by name
 *
 * @param state
 * @param arr
 * @param callback
 * @returns {function(elementName)}
 */
export const removeFromList = (state, arr, callback) => {

    return (elementName) => {
        let index = false,
            element = elementName;

        // search for element (by name)
        arr.forEach(
            (stateElement, i) => {

                if (stateElement.name.get() === elementName) {
                    index = i;
                    element = stateElement;
                }
            }
        );

        // remove item from array
        if (index !== false) {
            arr.splice(index, 1);
        }

        return callback(!!index, element);
    }
};

/**
 * get a list of elements (array)
 * set type to filter the list by type property
 *
 * @param arr
 * @param type
 * @returns {function()}
 */
export const getList = (arr, type) => {

    return () => {
        if (type) {
            return arr.filter(item => item.type.get() === type);
        }
        else {
            return arr;
        }
    }
};