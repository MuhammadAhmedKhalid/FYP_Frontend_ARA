import { ASSIGN_COURSE_FAILURE, ASSIGN_COURSE_REQUEST, ASSIGN_COURSE_SUCCESS, RESET_STATE } from './assignCourseTypes'

export const assignCourseInitialState = {
    loading: false,
    success: '',
    error: '',
    added: null
}

export const assignCourseReducer = (state = assignCourseInitialState, action) => {
    switch (action.type) {
        case ASSIGN_COURSE_REQUEST: return {
            ...state,
            loading: true
        }
        case ASSIGN_COURSE_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            added: true
        }
        case ASSIGN_COURSE_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            added: false
        }
        case RESET_STATE: return {
            ...state,
            added: null
        }
        default: return state
    }
}