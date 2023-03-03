import { ADD_DEPARTMENT_FAILURE, ADD_DEPARTMENT_REQUEST, ADD_DEPARTMENT_SUCCESS, RESET_STATE } from './addDepartmentTypes'

export const addDepartmentInitialState = {
    loading: false,
    success: '',
    error: '',
    added: null,
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
            added: true
        }
        case ADD_DEPARTMENT_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            added: false
        }
        case RESET_STATE: return {
            ...state,
            added: null
        }
        default: return state
    }
}