import { UPDATE_COURSE_REQUEST } from './updateCourseTypes'

export const updateCourse = (department_id, course_id, course_name) => {
    return {
        type: UPDATE_COURSE_REQUEST,
        department_id,
        course_id,
        course_name
    }
}