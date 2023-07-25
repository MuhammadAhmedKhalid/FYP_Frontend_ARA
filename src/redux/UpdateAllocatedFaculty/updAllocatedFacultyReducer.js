import { UPDATE_ALLOCATED_FACULTY_FAILURE, UPDATE_ALLOCATED_FACULTY_REQUEST, UPDATE_ALLOCATED_FACULTY_SUCCESS, RESET_STATE } from './updAllocatedFacultyTypes'

const updateAllocatedFacultyInitialState = {
    loading: false,
    result: '',
    error: '',
    updated: null
}

export const updateAllocatedFacultyReducer = (state = updateAllocatedFacultyInitialState, action) => {
    switch (action.type) {
        case UPDATE_ALLOCATED_FACULTY_REQUEST: return {
            ...state,
            loading: true
        }
        case UPDATE_ALLOCATED_FACULTY_SUCCESS: return {
            ...state,
            loading: false,
            result: action.message,
            error: '',
            updated: true
        }
        case UPDATE_ALLOCATED_FACULTY_FAILURE: return {
            ...state,
            loading: false,
            result: '',
            error: action.message,
            updated: false
        }
        case RESET_STATE: return {
            ...state,
            error: '',
            updated: null
        }
        default: return state
    }
}