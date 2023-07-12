import { UPDATE_DEPARTMENT_REQUEST, RESET_STATE } from './updateDeptTypes'

export const updateDepartment = (department_id, dept) => {
    return {
        type: UPDATE_DEPARTMENT_REQUEST,
        department_id,
        dept
    }
}
export const resetState = () => {
    return {
        type: RESET_STATE
    }
}