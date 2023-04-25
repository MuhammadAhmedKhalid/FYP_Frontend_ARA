import { UPDATE_DEPARTMENT_REQUEST } from './updateDeptTypes'

export const updateDepartment = (department_id, department_name) => {
    return {
        type: UPDATE_DEPARTMENT_REQUEST,
        department_id,
        department_name
    }
}