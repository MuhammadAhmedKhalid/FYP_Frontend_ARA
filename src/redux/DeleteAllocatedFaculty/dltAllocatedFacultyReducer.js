import { DELETE_ALLOCATED_FACULTY_FAILURE, DELETE_ALLOCATED_FACULTY_REQUEST, DELETE_ALLOCATED_FACULTY_SUCCESS, RESET_STATE } from './dltAllocatedFacultyTypes'

export const deleteAllocatedFacultyInitialState = {
    loading: false,
    success: '',
    error: '',
    deleted: null
}

export const deleteAllocatedFacultyReducer = (state = deleteAllocatedFacultyInitialState, action) => {
    switch (action.type) {
        case DELETE_ALLOCATED_FACULTY_REQUEST: return {
            ...state,
            loading: true
        }
        case DELETE_ALLOCATED_FACULTY_SUCCESS:  return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            deleted: true
        }
        case DELETE_ALLOCATED_FACULTY_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            deleted: false
        }
        case RESET_STATE: return {
            ...state,
            deleted: null
        }
        default: return state
    }
}