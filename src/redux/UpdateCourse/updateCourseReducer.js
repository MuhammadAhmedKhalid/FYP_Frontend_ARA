import { UPDATE_COURSE_FAILURE, UPDATE_COURSE_REQUEST, UPDATE_COURSE_SUCCESS } from './updateCourseTypes'

const updateCourseInitialState = {
    loading: false,
    result: '',
    error: '',
    updated: false
}

export const updateCourseReducer = (state = updateCourseInitialState, action) => {
    switch (action.type) {
        case UPDATE_COURSE_REQUEST: return {
            ...state,
            loading: true
        }
        case UPDATE_COURSE_SUCCESS: return {
            ...state,
            loading: false,
            result: action.result,
            error: '',
            updated: true
        }
        case UPDATE_COURSE_FAILURE: return {
            ...state,
            loading: false,
            result: '',
            error: action.message,
            updated: false
        }
        default: return state
    }
}