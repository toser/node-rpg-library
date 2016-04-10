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