import { ADD_OBJECT_FAILURE, ADD_OBJECT_REQUEST, ADD_OBJECT_SUCCESS } from './addObjectTypes'

export const addObjectInitialState = {
    loading: false,
    success: '',
    error: '',
}

export const addObjectReducer = (state = addObjectInitialState, action) => {
    switch (action.type) {
        case ADD_OBJECT_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_OBJECT_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
        }
        case ADD_OBJECT_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
        }
        default: return state
    }
}