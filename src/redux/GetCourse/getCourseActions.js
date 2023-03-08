import { GET_COURSE_REQUEST } from './getCourseTypes'

export const getCourseRequest = (query) => {
    return {
        type: GET_COURSE_REQUEST,
        query
    }
}