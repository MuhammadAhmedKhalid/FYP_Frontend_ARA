import { DELETE_DEPARTMENT_REQUEST } from './deleteDeptTypes'

export const deleteDepartmentRequest = (query) => {
    return {
        type: DELETE_DEPARTMENT_REQUEST,
        query
    }
}