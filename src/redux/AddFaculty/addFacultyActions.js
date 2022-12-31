import { ADD_FACULTY_REQUEST } from './addFacultyTypes'

export const addFacultyRequest = (faculty) => {
    return {
        type: ADD_FACULTY_REQUEST,
        faculty
    }
}