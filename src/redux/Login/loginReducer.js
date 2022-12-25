import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./loginTypes"

export const loginInitialState = {
    loading: false,
    success: '',
    error: ''
}

export const loginReducer = (state = loginInitialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST: return {
            ...state,
            loading: true
        }
        case LOGIN_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: ''
        }
        case LOGIN_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message
        }
        default: return state
    }
}