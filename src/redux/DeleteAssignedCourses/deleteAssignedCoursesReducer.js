import { DELETE_ASSIGNED_COURSES_FAILURE, DELETE_ASSIGNED_COURSES_REQUEST, DELETE_ASSIGNED_COURSES_SUCCESS } from './deleteAssignedCoursesTypes'

export const deleteAssignedCoursesInitialState = {
    loading: false,
    success: '',
    error: '',
    deleted: null
}

export const deleteAssignedCoursesReducer = (state = deleteAssignedCoursesInitialState, action) => {
    switch (action.type) {
        case DELETE_ASSIGNED_COURSES_REQUEST: return {
            ...state,
            loading: true
        }
        case DELETE_ASSIGNED_COURSES_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            deleted: true
        }
        case DELETE_ASSIGNED_COURSES_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            deleted: false
        }
        default: return state
    }
}