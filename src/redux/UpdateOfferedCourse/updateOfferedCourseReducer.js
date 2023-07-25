import { UPDATE_OFFERED_COURSE_FAILURE, UPDATE_OFFERED_COURSE_REQUEST, UPDATE_OFFERED_COURSE_SUCCESS, RESET_STATE } from './updateOfferedCourseTypes'

const updateOfferedCourseInitialState = {
    loading: false,
    result: '',
    error: '',
    updated: false
}

export const updateOfferedCourseReducer = (state = updateOfferedCourseInitialState, action) => {
    switch (action.type) {
        case UPDATE_OFFERED_COURSE_REQUEST: return {
            ...state,
            loading: true
        }
        case UPDATE_OFFERED_COURSE_SUCCESS: return {
            ...state,
            loading: false,
            result: action.result,
            error: '',
            updated: true
        }
        case UPDATE_OFFERED_COURSE_FAILURE: return {
            ...state,
            loading: false,
            result: '',
            error: action.message,
            updated: false
        }
        case RESET_STATE: return {
            ...state,
            error: '',
            updated: false
        }
        default: return state
    }
}