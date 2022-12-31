import { GET_FACULTY_REQUEST } from './getFacultyTypes'

export const getFacultyRequest = (query) => {
    return {
        type: GET_FACULTY_REQUEST,
        query
    }
}