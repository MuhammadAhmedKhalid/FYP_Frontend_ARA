import { GET_OFFERED_COURSES_REQUEST } from './getOfferedCoursesTypes'

export const getOfferedCourses = (query) => {
    return {
        type: GET_OFFERED_COURSES_REQUEST,
        query
    }
}