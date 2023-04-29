import { DELETE_COURSE_REQUEST } from './deleteCourseTypes'

export const deleteCourseRequest = (query) => {
    return {
        type: DELETE_COURSE_REQUEST,
        query
    }
}