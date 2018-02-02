import { combineReducers } from 'redux';


function count(state = 0, action) {
	switch (action.type) {
	case 'increase':
        return state+1;
    case 'decrease':
        return state-1;
	default:
		return state;
	}
}

const todo = (state={} , action) => {
    switch (action.type) {
        case 'ADD_TODO': 
            return {
                id: action.data.id ? action.data.id : 0,
                text: action.data.text,
                completed: false
            }
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state
            }
            return Object.assign({}, state, {
                completed: !state.completed
            })
        default:
            return state
    }
}

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ]
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action))
        default:
            return state
    }
}

const visibilityFilter = (state = 'SHOW_ALL', action)=> {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.visibilityFilter
        default:
            return state
    }
}

const reducer = combineReducers({
    todos,
    count,
    visibilityFilter
})

export default reducer;