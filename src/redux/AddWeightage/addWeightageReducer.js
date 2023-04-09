import { ADD_WEIGHTAGE_FAILURE, ADD_WEIGHTAGE_REQUEST, ADD_WEIGHTAGE_SUCCESS } from './addWeightageTypes'

export const addWeightageInitialState = {
    loading: false,
    success: '',
    error: '',
    added: null,
}

export const addWeightageReducer = (state = addWeightageInitialState, action) => {
    switch (action.type) {
        case ADD_WEIGHTAGE_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_WEIGHTAGE_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            added: true
        }
        case ADD_WEIGHTAGE_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            added: false
        }
        default: return state
    }
}