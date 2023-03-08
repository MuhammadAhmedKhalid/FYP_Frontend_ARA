import { ADD_COURSE_REQUEST, RESET_STATE } from './addCourseTypes'

export const addCourseRequest = (course) => {
    return {
        type: ADD_COURSE_REQUEST,
        course
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}