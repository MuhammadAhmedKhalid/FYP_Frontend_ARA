import { ADD_COURSE_FAILURE, ADD_COURSE_REQUEST, ADD_COURSE_SUCCESS, RESET_STATE } from './addCourseTypes'

export const addCourseInitialState = {
    loading: false,
    success: '',
    error: '',
    added: null
}

export const addCourseReducer = (state = addCourseInitialState, action) => {
    switch (action.type) {
        case ADD_COURSE_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_COURSE_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            added: true
        }
        case ADD_COURSE_FAILURE: return {
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