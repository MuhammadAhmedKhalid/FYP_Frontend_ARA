import { ADD_COURSE_FAILURE, RESET_STATE } from './addCourseTypes'

export const addCourseRequest = (course) => {
    return {
        type: ADD_COURSE_FAILURE,
        course
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}