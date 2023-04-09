import { GET_WEIGHTAGE_FAILURE, GET_WEIGHTAGE_REQUEST, GET_WEIGHTAGE_SUCCESS } from './getWeightageTypes'

const weightageInitialState = {
    loading: false,
    weightages: [],
    error: '',
    added: false
}

export const weightageReducer = (state = weightageInitialState, action) => {
    switch (action.type) {
        case GET_WEIGHTAGE_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_WEIGHTAGE_SUCCESS: return {
            ...state,
            loading: false,
            weightages: action.result,
            error: '',
            added: true
        }
        case GET_WEIGHTAGE_FAILURE: return {
            ...state,
            loading: false,
            weightages: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}