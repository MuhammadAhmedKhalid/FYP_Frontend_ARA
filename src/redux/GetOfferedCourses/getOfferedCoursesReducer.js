import { GET_OFFERED_COURSES_FAILURE, GET_OFFERED_COURSES_REQUEST, GET_OFFERED_COURSES_SUCCESS } from './getOfferedCoursesTypes'

const offeredCoursesInitialState = {
    loading: false,
    offeredCourses: [],
    error: '',
    added: false
}

export const offeredCoursesReducer = (state = offeredCoursesInitialState, action) => {
    switch (action.type) {
        case GET_OFFERED_COURSES_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_OFFERED_COURSES_SUCCESS: return {
            ...state,
            loading: false,
            offeredCourses: action.result,
            error: '',
            added: true
        }
        case GET_OFFERED_COURSES_FAILURE: return {
            ...state,
            loading: false,
            offeredCourses: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}