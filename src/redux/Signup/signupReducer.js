import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./signupTypes"

export const signupInitialState = {
    loading: false,
    success: '',
    error: ''
}

export const signupReducer = (state = signupInitialState, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST: return {
            ...state,
            loading: true
        }
        case SIGNUP_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: ''
        }
        case SIGNUP_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message
        }
        default: return state
    }
}