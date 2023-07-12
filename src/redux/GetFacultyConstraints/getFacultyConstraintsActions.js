import { GET_FACULTY_CONSTRAINTS_REQUEST } from './getFacultyConstraintsTypes'

export const getFacultyConstraintsRequest = (query) => {
    return {
        type: GET_FACULTY_CONSTRAINTS_REQUEST,
        query
    }
}