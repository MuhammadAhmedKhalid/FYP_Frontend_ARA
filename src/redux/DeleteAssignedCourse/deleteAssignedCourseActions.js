import { DELETE_ASSIGNED_COURSE_REQUEST } from './deleteAssignedCourseTypes'

export const deletassignedCourseRequest = (query) => {
    return {
        type: DELETE_ASSIGNED_COURSE_REQUEST,
        query
    }
}