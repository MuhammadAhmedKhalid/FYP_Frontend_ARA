import { UPDATE_WEIGHTAGE_FAILURE, UPDATE_WEIGHTAGE_REQUEST, UPDATE_WEIGHTAGE_SUCCESS } from './updateWeightageTypes'

const updateWeightageInitialState = {
    loading: false,
    result: '',
    error: '',
    updated: false
}

export const updateWeightageReducer = (state = updateWeightageInitialState, action) => {
    switch (action.type) {
        case UPDATE_WEIGHTAGE_REQUEST: return {
            ...state,
            loading: true
        }
        case UPDATE_WEIGHTAGE_SUCCESS: return {
            ...state,
            loading: false,
            result: action.result,
            error: '',
            updated: true
        }
        case UPDATE_WEIGHTAGE_FAILURE: return {
            ...state,
            loading: false,
            result: '',
            error: action.message,
            updated: false
        }
        default: return state
    }
}