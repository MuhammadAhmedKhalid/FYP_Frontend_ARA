import { DELETE_OFFERED_COURSE_REQUEST } from './deleteOfferedCourseTypes'

export const deleteOfferedCourseRequest = (query) => {
    return {
        type: DELETE_OFFERED_COURSE_REQUEST,
        query
    }
}