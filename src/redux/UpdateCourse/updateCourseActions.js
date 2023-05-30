import { UPDATE_COURSE_REQUEST, RESET_STATE } from './updateCourseTypes'

export const updateCourse = (department_id, course_id, course) => {
    return {
        type: UPDATE_COURSE_REQUEST,
        department_id,
        course_id,
        course
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}