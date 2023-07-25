import { GET_ALLOCATED_FACULTY_REQUEST } from './allocatedFacultyTypes'

export const getAllocatedFaculty = (query) => {
    return {
        type: GET_ALLOCATED_FACULTY_REQUEST,
        query
    }
}