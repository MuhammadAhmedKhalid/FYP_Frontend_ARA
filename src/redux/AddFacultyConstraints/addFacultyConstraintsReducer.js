import { ADD_FACULTY_CONSTRAINTS_FAILURE, ADD_FACULTY_CONSTRAINTS_REQUEST, ADD_FACULTY_CONSTRAINTS_SUCCESS } from './addFacultyConstraintsTypes'

export const addFacultyConstraintsInitialState = {
    loading: false,
    success: '',
    error: ''
}

export const addFacultyConstraintsReducer = (state = addFacultyConstraintsInitialState, action) => {
    switch (action.type) {
        case ADD_FACULTY_CONSTRAINTS_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_FACULTY_CONSTRAINTS_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: ''
        }
        case ADD_FACULTY_CONSTRAINTS_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message
        }
        default: return state
    }
}