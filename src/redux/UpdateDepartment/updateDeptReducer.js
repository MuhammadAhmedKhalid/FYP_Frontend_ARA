import { UPDATE_DEPARTMENT_FAILURE, UPDATE_DEPARTMENT_REQUEST, UPDATE_DEPARTMENT_SUCCESS } from './updateDeptTypes'

const updateDepartmentInitialState = {
    loading: false,
    result: '',
    error: '',
    updated: false
}

export const updateDepartmentReducer = (state = updateDepartmentInitialState, action) => {
    switch (action.type) {
        case UPDATE_DEPARTMENT_REQUEST: return {
            ...state,
            loading: true
        }
        case UPDATE_DEPARTMENT_SUCCESS: return {
            ...state,
            loading: false,
            result: action.result,
            error: '',
            updated: true
        }
        case UPDATE_DEPARTMENT_FAILURE: return {
            ...state,
            loading: false,
            result: '',
            error: action.message,
            updated: false
        }
        default: return state
    }
}