import { UPDATE_DEPARTMENT_REQUEST, RESET_STATE } from './updateDeptTypes'

export const updateDepartment = (department_id, department_name) => {
    return {
        type: UPDATE_DEPARTMENT_REQUEST,
        department_id,
        department_name
    }
}
export const resetState = () => {
    return {
        type: RESET_STATE
    }
}