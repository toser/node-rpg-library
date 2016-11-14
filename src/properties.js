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
 * basic getter and setter for numerical properties
 *
 * @param property
 * @param parent
 * @param state
 */
export const numericalPositive = (property, parent, state = parent) => ({
    get: () => parent[property],
    up: (val = 1) => {
        parent[property] = parent[property] + val;
        if (parent[property] < 0) {
            parent[property] = 0;
        }
        return state.element;
    },
    down: (val = 1) => {
        parent[property] = parent[property] - val;
        if (parent[property] < 0) {
            parent[property] = 0;
        }
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
        list: getList(parent[property]),
        add: addToList(parent[property], state),
        remove: removeFromList(parent[property], state)
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
 * add element to array
 */
export const addToList = (arr, state) => {

    return (element) => {

        if(element.constructor === Array) {
            element.forEach(function (item) {
                arr.push(item);
            });
        }
        else {
            arr.push(element);
        }

        return state.element;
    };
};

/**
 * remove element from array by name
 *
 * @param state
 * @param arr
 * @param callback
 * @returns {function(elementName)}
 */
export const removeFromList = (arr, state) => {

    return (id) => {

        let index = arr.map(i => i.id.get()).indexOf(id);

        if(index !== -1) {
            arr.splice(index, 1);
        }

        return state.element;
    }
};

/**
 * get a list of elements (array)
 * set type to filter the list by type property
 *
 * @param arr
 * @param type
 * @returns {function}
 */
export const getList = (arr, type) => {

    return (key, value) => { // or filter by key:value pair
        if (type) {
            return arr.filter(item => item.type.get() === type);
        } else if (key && (value || value === 0)) {
            return arr.filter(item => key in item ? item[key].get() === value : false);
        } else {
            return arr;
        }
    }
};
