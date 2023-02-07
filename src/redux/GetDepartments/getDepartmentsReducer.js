import { GET_DEPARTEMNTS_FAILURE, GET_DEPARTEMNTS_REQUEST, GET_DEPARTEMNTS_SUCCESS } from './getDepartmentsTypes'

const departmentsInitialState = {
    loading: false,
    departments: [],
    error: '',
    added: false
}

export const departmentsReducer = (state = departmentsInitialState, action) => {
    switch (action.type) {
        case GET_DEPARTEMNTS_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_DEPARTEMNTS_SUCCESS: return {
            ...state,
            loading: false,
            departments: action.result,
            error: '',
            added: true
        }
        case GET_DEPARTEMNTS_FAILURE: return {
            ...state,
            loading: false,
            departments: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}