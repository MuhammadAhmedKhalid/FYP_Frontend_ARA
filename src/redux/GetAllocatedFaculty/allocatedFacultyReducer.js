import { GET_ALLOCATED_FACULTY_FAILURE, GET_ALLOCATED_FACULTY_REQUEST, GET_ALLOCATED_FACULTY_SUCCESS } from './allocatedFacultyTypes'

const allocatedFacultyInitialState = {
    loading: false,
    allocatedFaculty: [],
    error: '',
    added: false
}

export const allocatedFacultyReducer = (state = allocatedFacultyInitialState, action) => {
    switch (action.type) {
        case GET_ALLOCATED_FACULTY_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_ALLOCATED_FACULTY_SUCCESS: return {
            ...state,
            loading: false,
            allocatedFaculty: action.result,
            error: '',
            added: true
        }
        case GET_ALLOCATED_FACULTY_FAILURE: return {
            ...state,
            loading: false,
            allocatedFaculty: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}