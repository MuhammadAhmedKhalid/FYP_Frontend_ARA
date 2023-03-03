import { ADD_FACULTY_FAILURE, ADD_FACULTY_REQUEST, ADD_FACULTY_SUCCESS, RESET_STATE } from './addFacultyTypes'

export const addFacultyInitialState = {
    loading: false,
    success: '',
    error: '',
    added: null
}

export const addFacultyReducer = (state = addFacultyInitialState, action) => {
    switch (action.type) {
        case ADD_FACULTY_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_FACULTY_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            added: true
        }
        case ADD_FACULTY_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            added: false
        }
        default: return state
    }
}