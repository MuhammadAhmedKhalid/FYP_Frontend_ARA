import { GET_SPECIALIZATION_FAILURE, GET_SPECIALIZATION_REQUEST, GET_SPECIALIZATION_SUCCESS } from './getSpecializationTypes'

const getSpecializationInitialState = {
    loading: false,
    specializations: [],
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
            specializations: action.data,
            error: '',
            added: true
        }
        case GET_SPECIALIZATION_FAILURE: return {
            ...state,
            loading: false,
            specializations: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}