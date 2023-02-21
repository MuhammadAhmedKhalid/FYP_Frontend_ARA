import { GET_SPECIALIZATION_FAILURE, GET_SPECIALIZATION_REQUEST, GET_SPECIALIZATION_SUCCESS } from './getSpecializationTypes'

const getSpecializationInitialState = {
    loading: false,
    faculty: [],
    error: '',
    added: false
}

export const getSpecializationReducer = (state = getSpecializationInitialState, action) => {
    switch (action.type) {
        case GET_SPECIALIZATION_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_SPECIALIZATION_SUCCESS: return {
            ...state,
            loading: false,
            faculty: action.data,
            error: '',
            added: true
        }
        case GET_SPECIALIZATION_FAILURE: return {
            ...state,
            loading: false,
            faculty: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}