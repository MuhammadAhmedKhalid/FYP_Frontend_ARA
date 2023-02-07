import { ADD_DEPARTMENT_REQUEST } from './addDepartmentTypes'

export const addDepartmentRequest = (department) => {
    return {
        type: ADD_DEPARTMENT_REQUEST,
        department
    }
}