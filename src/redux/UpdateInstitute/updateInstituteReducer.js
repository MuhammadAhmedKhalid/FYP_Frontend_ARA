import { UPDATE_INSTITUTE_FAILURE, UPDATE_INSTITUTE_REQUEST, UPDATE_INSTITUTE_SUCCESS } from './updateInstituteTypes'

const updateInstituteInitialState = {
    loading: false,
    result: '',
    error: '',
    updated: false
}

export const updateInstituteReducer = (state = updateInstituteInitialState, action) => {
    switch (action.type) {
        case UPDATE_INSTITUTE_REQUEST: return {
            ...state,
            loading: true
        }
        case UPDATE_INSTITUTE_SUCCESS: return {
            ...state,
            loading: false,
            result: action.result,
            error: '',
            updated: true
        }
        case UPDATE_INSTITUTE_FAILURE: return {
            ...state,
            loading: false,
            result: '',
            error: action.message,
            updated: false
        }
        default: return state
    }
}