import { ASSIGNED_COURSES_FOR_TABLE_REQUEST } from './assignedCoursesForTableTypes'

export const assignedCoursesForTableRequest = (query) => {
    return {
        type: ASSIGNED_COURSES_FOR_TABLE_REQUEST,
        query
    }
}