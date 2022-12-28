import { ADD_INSTITUTE_FAILURE, ADD_INSTITUTE_REQUEST, ADD_INSTITUTE_SUCCESS } from './instituteTypes'

export const addInstituteInitialState = {
    loading: false,
    success: '',
    error: '',
    added: false,
    institute_name: ""
}

export const addInstituteReducer = (state = addInstituteInitialState, action) => {
    switch (action.type) {
        case ADD_INSTITUTE_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_INSTITUTE_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            added: true,
            institute_name: action.institute_name
        }
        case ADD_INSTITUTE_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            added: false,
            institute_name: ""
        }
        default: return state
    }
}