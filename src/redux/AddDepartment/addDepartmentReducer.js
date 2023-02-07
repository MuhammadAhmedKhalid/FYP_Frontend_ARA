import { ADD_DEPARTMENT_FAILURE, ADD_DEPARTMENT_REQUEST, ADD_DEPARTMENT_SUCCESS } from './addDepartmentTypes'

export const addDepartmentInitialState = {
    loading: false,
    success: '',
    error: '',
}

export const addDepartmentReducer = (state = addDepartmentInitialState, action) => {
    switch (action.type) {
        case ADD_DEPARTMENT_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_DEPARTMENT_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
        }
        case ADD_DEPARTMENT_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
        }
        default: return state
    }
}