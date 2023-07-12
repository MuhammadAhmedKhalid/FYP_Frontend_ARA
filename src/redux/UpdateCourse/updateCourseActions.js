import { UPDATE_COURSE_REQUEST, RESET_STATE } from './updateCourseTypes'

export const updateCourse = (course_id, course) => {
    return {
        type: UPDATE_COURSE_REQUEST,
        course_id,
        course
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}