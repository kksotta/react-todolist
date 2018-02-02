const DEFAULT_ID = 0;

export const addToDo = (text) => {
    return {
        type: 'ADD_TODO',
        id: DEFAULT_ID,
        text
    }
}

export const setVisibility = (filter) => {
    return {
        type: 'SET_VISIBILITY',
        filter
    }
}

export const toggleToDo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    }
}