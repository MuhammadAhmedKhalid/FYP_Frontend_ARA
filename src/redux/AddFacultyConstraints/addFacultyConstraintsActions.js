import { ADD_FACULTY_CONSTRAINTS_REQUEST } from './addFacultyConstraintsTypes'

export const addFacultyConstraintsRequest = (constraints) => {
    return {
        type: ADD_FACULTY_CONSTRAINTS_REQUEST,
        constraints
    }
}