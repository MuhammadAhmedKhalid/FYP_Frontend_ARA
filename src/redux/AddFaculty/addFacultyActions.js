import { ADD_FACULTY_REQUEST, RESET_STATE } from './addFacultyTypes'

export const addFacultyRequest = (faculty) => {
    return {
        type: ADD_FACULTY_REQUEST,
        faculty
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}