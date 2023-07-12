import { GET_FACULTY_CONSTRAINTS_FAILURE, GET_FACULTY_CONSTRAINTS_REQUEST, GET_FACULTY_CONSTRAINTS_SUCCESS } from './getFacultyConstraintsTypes'

const getFacultyConstraintsInitialState = {
    loading: false,
    facultyConstraints: [],
    error: '',
    added: false
}

export const getFacultyConstraintsReducer = (state = getFacultyConstraintsInitialState, action) => {
    switch (action.type) {
        case GET_FACULTY_CONSTRAINTS_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_FACULTY_CONSTRAINTS_SUCCESS: return {
            ...state,
            loading: false,
            facultyConstraints: action.data,
            error: '',
            added: true
        }
        case GET_FACULTY_CONSTRAINTS_FAILURE: return {
            ...state,
            loading: false,
            facultyConstraints: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}