import { ASSIGN_COURSE_REQUEST, RESET_STATE } from './assignCourseTypes'

export const assignCourseRequest = (assignCourse) => {
    return {
        type: ASSIGN_COURSE_REQUEST,
        assignCourse
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}