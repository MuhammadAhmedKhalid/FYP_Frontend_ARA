import { ADD_ALLOCATE_FACULTY_REQUEST, RESET_STATE } from './allocateFacultyTypes'

export const allocateFaculty = (obj) => {
    return {
        type: ADD_ALLOCATE_FACULTY_REQUEST,
        obj
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}