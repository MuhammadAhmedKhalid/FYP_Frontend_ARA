import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST } from "./loginTypes"

export const loginInitialState = {
    loading: false,
    success: '',
    error: '',
    isLoggedIn: undefined,
    loginFailed: false,
    user: {
        user_id:0,
	    email:'',
	    jwt:'',
	    name:'',
	    institute_name:'',
	 institute_id:0,
	 is_admin:false
    }
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
            user: action.user,
            loginFailed: false,
        }
        case LOGIN_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            isLoggedIn: false,
            loginFailed: true,
        }
        case LOGOUT_REQUEST: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            isLoggedIn: false,
            user: null,
            loginFailed: false,
        }
        default: return state
    }
}