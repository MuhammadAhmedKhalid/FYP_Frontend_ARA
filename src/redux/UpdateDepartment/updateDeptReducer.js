import { UPDATE_DEPARTMENT_FAILURE, UPDATE_DEPARTMENT_REQUEST, UPDATE_DEPARTMENT_SUCCESS, RESET_STATE } from './updateDeptTypes'

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
        case RESET_STATE: return {
            ...state,
            error: ''
        }
        default: return state
    }
}