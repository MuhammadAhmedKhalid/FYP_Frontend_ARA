import { ASSIGNED_COURSES_REQUEST } from './assignedCoursesTypes'

export const assignedCoursesRequest = (query) => {
    return {
        type: ASSIGNED_COURSES_REQUEST,
        query
    }
}