import { GET_COURSE_FAILURE, GET_COURSE_REQUEST, GET_COURSE_SUCCESS } from './getCourseTypes'

const getCourseInitialState = {
    loading: false,
    courses: [],
    error: '',
    added: false
}

export const getCourseReducer = (state = getCourseInitialState, action) => {
    switch (action.type) {
        case GET_COURSE_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_COURSE_SUCCESS: return {
            ...state,
            loading: false,
            courses: action.data,
            error: '',
            added: true
        }
        case GET_COURSE_FAILURE: return {
            ...state,
            loading: false,
            courses: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}