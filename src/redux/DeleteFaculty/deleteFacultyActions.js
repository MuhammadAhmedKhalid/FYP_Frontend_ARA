import { DELETE_FACULTY_REQUEST } from './deleteFacultyTypes'

export const deleteFacultyRequest = (query) => {
    return {
        type: DELETE_FACULTY_REQUEST,
        query
    }
}