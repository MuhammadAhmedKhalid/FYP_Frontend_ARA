import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST } from "./loginTypes"

export const loginInitialState = {
    loading: false,
    success: '',
    error: '',
    isLoggedIn: false,
    user: {}
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
            user: action.user
        }
        case LOGIN_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            isLoggedIn: false,
            user: null
        }
        case LOGOUT_REQUEST: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            isLoggedIn: false,
            user: null
        }
        default: return state
    }
}