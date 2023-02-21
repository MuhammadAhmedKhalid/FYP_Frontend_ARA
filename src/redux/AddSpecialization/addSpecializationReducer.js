import { ADD_SPECIALIZATION_FAILURE, ADD_SPECIALIZATION_REQUEST, ADD_SPECIALIZATION_SUCCESS } from './addSpecializationTypes'

export const addSpecializationInitialState = {
    loading: false,
    success: '',
    error: '',
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
        }
        case ADD_SPECIALIZATION_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
        }
        default: return state
    }
}