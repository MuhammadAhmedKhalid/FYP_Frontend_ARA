import { ADD_FACULTY_FAILURE, ADD_FACULTY_REQUEST, ADD_FACULTY_SUCCESS } from './addFacultyTypes'

export const addFacultyInitialState = {
    loading: false,
    success: '',
    error: '',
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
        }
        case ADD_FACULTY_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
        }
        default: return state
    }
}