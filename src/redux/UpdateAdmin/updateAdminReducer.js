import { UPDATE_ADMIN_FAILURE, UPDATE_ADMIN_REQUEST, UPDATE_ADMIN_SUCCESS } from './updateAdminTypes'

const updateAdminInitialState = {
    loading: false,
    result: '',
    error: '',
    updated: false
}

export const updateAdminReducer = (state = updateAdminInitialState, action) => {
    switch (action.type) {
        case UPDATE_ADMIN_REQUEST: return {
            ...state,
            loading: true
        }
        case UPDATE_ADMIN_SUCCESS: return {
            ...state,
            loading: false,
            result: action.result,
            error: '',
            updated: true
        }
        case UPDATE_ADMIN_FAILURE: return {
            ...state,
            loading: false,
            result: '',
            error: action.message,
            updated: false
        }
        default: return state
    }
}