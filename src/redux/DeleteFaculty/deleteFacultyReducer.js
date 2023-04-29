import { DELETE_FACULTY_FAILURE, DELETE_FACULTY_REQUEST, DELETE_FACULTY_SUCCESS } from './deleteFacultyTypes'

export const deleteFacultyInitialState = {
    loading: false,
    success: '',
    error: '',
    deleted: null
}

export const deleteFacultyReducer = (state = deleteFacultyInitialState, action) => {
    switch (action.type) {
        case DELETE_FACULTY_REQUEST: return {
            ...state,
            loading: true
        }
        case DELETE_FACULTY_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            deleted: true
        }
        case DELETE_FACULTY_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            deleted: false
        }
        default: return state
    }
}