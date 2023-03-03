import { ADD_DEPARTMENT_REQUEST, RESET_STATE } from './addDepartmentTypes'

export const addDepartmentRequest = (department) => {
    return {
        type: ADD_DEPARTMENT_REQUEST,
        department
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}