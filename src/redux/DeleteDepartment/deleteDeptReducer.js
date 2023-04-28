import { DELETE_DEPARTMENT_FAILURE, DELETE_DEPARTMENT_REQUEST, DELETE_DEPARTMENT_SUCCESS } from './deleteDeptTypes'

export const deleteDepartmentInitialState = {
    loading: false,
    success: '',
    error: '',
    deleted: null
}

export const deleteDepartmentReducer = (state = deleteDepartmentInitialState, action) => {
    switch (action.type) {
        case DELETE_DEPARTMENT_REQUEST: return {
            ...state,
            loading: true
        }
        case DELETE_DEPARTMENT_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            deleted: true
        }
        case DELETE_DEPARTMENT_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            deleted: false
        }
        default: return state
    }
}