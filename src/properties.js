// basic getter and setter for properties
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