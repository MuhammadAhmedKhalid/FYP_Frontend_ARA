import { UPDATE_FACULTY_REQUEST, RESET_STATE } from './updateFacultyTypes'

export const updateFaculty = (faculty_id, faculty) => {
    return {
        type: UPDATE_FACULTY_REQUEST,
        faculty_id,
        faculty
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}