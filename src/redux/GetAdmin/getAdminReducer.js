import { GET_ADMIN_FAILURE, GET_ADMIN_REQUEST, GET_ADMIN_SUCCESS } from './getAdminTypes'

const adminInitialState = {
    loading: false,
    user: '',
    error: '',
    fetched: false
}

export const getAdminReducer = (state = adminInitialState, action) => {
    switch (action.type) {
        case GET_ADMIN_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_ADMIN_SUCCESS: return {
            ...state,
            loading: false,
            user: action.data,
            error: '',
            fetched: true
        }
        case GET_ADMIN_FAILURE: return {
            ...state,
            loading: false,
            user: null,
            error: action.message,
            fetched: false
        }
        default: return state
    }
}