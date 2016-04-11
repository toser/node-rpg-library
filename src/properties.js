/**
 * basic getter and setter for numerical properties
 */
export const numerical = (property, parent, state) => ({
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
 */
export const mixed = (property, parent, state) => ({
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
 */
export const boolean = (property, parent, state) => ({
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
 */
export const fixed = (property, parent, state) => ({
    get: () => parent[property]
});


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
