import { DELETE_ASSIGNED_COURSE_FAILURE, DELETE_ASSIGNED_COURSE_REQUEST, DELETE_ASSIGNED_COURSE_SUCCESS } from './deleteAssignedCourseTypes'

export const deleteAssignedCourseRequestInitialState = {
    loading: false,
    success: '',
    error: '',
    deleted: null
}

export const deleteAssignedCourseRequestReducer = (state = deleteAssignedCourseRequestInitialState, action) => {
    switch (action.type) {
        case DELETE_ASSIGNED_COURSE_REQUEST: return {
            ...state,
            loading: true
        }
        case DELETE_ASSIGNED_COURSE_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            deleted: true
        }
        case DELETE_ASSIGNED_COURSE_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            deleted: false
        }
        default: return state
    }
}