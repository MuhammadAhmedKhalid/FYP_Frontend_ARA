import { DELETE_ALLOCATED_FACULTY_REQUEST, RESET_STATE } from './dltAllocatedFacultyTypes'

export const deleteAllocatedFacultyRequest = (query) => {
    return {
        type: DELETE_ALLOCATED_FACULTY_REQUEST,
        query
    }
}

export const resetDeleteState = () => {
    return {
        type: RESET_STATE
    }
}