import { DELETE_COURSE_FAILURE, DELETE_COURSE_REQUEST, DELETE_COURSE_SUCCESS } from './deleteCourseTypes'

export const deleteCourseInitialState = {
    loading: false,
    success: '',
    error: '',
    deleted: null
}

export const deleteCourseReducer = (state = deleteCourseInitialState, action) => {
    switch (action.type) {
        case DELETE_COURSE_REQUEST: return {
            ...state,
            loading: true
        }
        case DELETE_COURSE_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            deleted: true
        }
        case DELETE_COURSE_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            deleted: false
        }
        default: return state
    }
}