import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST } from "./loginTypes"

export const loginInitialState = {
    loading: false,
    success: '',
    error: '',
    isLoggedIn: false
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
            error: '',
            isLoggedIn: true,
        }
        case LOGIN_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            isLoggedIn: false
        }
        case LOGOUT_REQUEST: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            isLoggedIn: false
        }
        default: return state
    }
}