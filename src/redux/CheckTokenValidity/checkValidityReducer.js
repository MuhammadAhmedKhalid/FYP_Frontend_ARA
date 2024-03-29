import { CHECK_VALIDITY_FAILURE, CHECK_VALIDITY_REQUEST, CHECK_VALIDITY_SUCCESS } from './checkValidityTypes'

const checkTokenInitialState = {
    loading: true,
    valid: false,
}

export const checkTokenReducer = (state = checkTokenInitialState, action) => {
    switch (action.type) {
        case CHECK_VALIDITY_REQUEST: return {
            ...state,
            loading: true
        }
        case CHECK_VALIDITY_SUCCESS: return {
            ...state,
            loading: false,
            valid: true,
        }
        case CHECK_VALIDITY_FAILURE: return {
            ...state,
            loading: false,
            valid: false,
        }
        default: return state
    }
}