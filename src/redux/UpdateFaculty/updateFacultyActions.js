import { UPDATE_FACULTY_REQUEST } from './updateFacultyTypes'

export const updateFaculty = (faculty_id, name, phone_number, designation) => {
    return {
        type: UPDATE_FACULTY_REQUEST,
        faculty_id,
        name,
        phone_number, 
        designation
    }
}