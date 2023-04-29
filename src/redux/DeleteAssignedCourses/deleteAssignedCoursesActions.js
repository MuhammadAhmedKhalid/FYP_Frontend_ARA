import { DELETE_ASSIGNED_COURSES_REQUEST } from './deleteAssignedCoursesTypes'

export const deleteAssignedCoursesRequest = (query) => {
    return {
        type: DELETE_ASSIGNED_COURSES_REQUEST,
        query
    }
}