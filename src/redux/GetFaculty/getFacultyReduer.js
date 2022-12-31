import { GET_FACULTY_FAILURE, GET_FACULTY_REQUEST, GET_FACULTY_SUCCESS } from './getFacultyTypes'

const getFacultyInitialState = {
    loading: false,
    faculty: [],
    error: '',
    added: false
}

export const getFacultyReducer = (state = getFacultyInitialState, action) => {
    switch (action.type) {
        case GET_FACULTY_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_FACULTY_SUCCESS: return {
            ...state,
            loading: false,
            faculty: action.data,
            error: '',
            added: true
        }
        case GET_FACULTY_FAILURE: return {
            ...state,
            loading: false,
            faculty: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}