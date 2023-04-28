import { UPDATE_FACULTY_FAILURE, UPDATE_FACULTY_REQUEST, UPDATE_FACULTY_SUCCESS, RESET_STATE } from './updateFacultyTypes'

const updateFacultyInitialState = {
    loading: false,
    result: '',
    error: '',
    updated: false
}

export const updateFacultyReducer = (state = updateFacultyInitialState, action) => {
    switch (action.type) {
        case UPDATE_FACULTY_REQUEST: return {
            ...state,
            loading: true
        }
        case UPDATE_FACULTY_SUCCESS: return {
            ...state,
            loading: false,
            result: action.result,
            error: '',
            updated: true
        }
        case UPDATE_FACULTY_FAILURE: return {
            ...state,
            loading: false,
            result: '',
            error: action.message,
            updated: false
        }
        case RESET_STATE: return {
            ...state,
            error: '',
            updated: false
        }
        default: return state
    }
}