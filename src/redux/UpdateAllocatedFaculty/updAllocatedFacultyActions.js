import { UPDATE_ALLOCATED_FACULTY_REQUEST, RESET_STATE } from './updAllocatedFacultyTypes'

export const updateAllocatedFaculty = (allocateFacultyId, allocateFaculty) => {
    return {
        type: UPDATE_ALLOCATED_FACULTY_REQUEST,
        allocateFacultyId,
        allocateFaculty
    }
}
export const resetState = () => {
    return {
        type: RESET_STATE
    }
}