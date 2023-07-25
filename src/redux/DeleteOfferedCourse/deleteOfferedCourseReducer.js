import { DELETE_OFFERED_COURSE_FAILURE, DELETE_OFFERED_COURSE_REQUEST, DELETE_OFFERED_COURSE_SUCCESS,RESET_STATE } from './deleteOfferedCourseTypes'

export const deleteOfferedCourseInitialState = {
    loading: false,
    success: '',
    error: '',
    deleted: null
}

export const deleteOfferedCourseReducer = (state = deleteOfferedCourseInitialState, action) => {
    switch (action.type) {
        case DELETE_OFFERED_COURSE_REQUEST: return {
            ...state,
            loading: true
        }
        case DELETE_OFFERED_COURSE_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            deleted: true
        }
        case DELETE_OFFERED_COURSE_FAILURE: return {
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