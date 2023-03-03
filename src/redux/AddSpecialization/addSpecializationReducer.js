import { ADD_SPECIALIZATION_FAILURE, ADD_SPECIALIZATION_REQUEST, ADD_SPECIALIZATION_SUCCESS, RESET_STATE } from './addSpecializationTypes'

export const addSpecializationInitialState = {
    loading: false,
    success: '',
    error: '',
    added: null
}

export const addSpecializationReducer = (state = addSpecializationInitialState, action) => {
    switch (action.type) {
        case ADD_SPECIALIZATION_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_SPECIALIZATION_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            added: true
        }
        case ADD_SPECIALIZATION_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            added: false
        }
        case RESET_STATE: return {
            ...state,
            added: null
        }
        default: return state
    }
}