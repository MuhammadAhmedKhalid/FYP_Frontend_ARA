import { DELETE_OBJ_FAILURE, DELETE_OBJ_REQUEST, DELETE_OBJ_SUCCESS } from './deleteObjTypes'

export const deleteObjInitialState = {
    loading: false,
    success: '',
    error: '',
    deleted: null
}

export const deleteObjReducer = (state = deleteObjInitialState, action) => {
    switch (action.type) {
        case DELETE_OBJ_REQUEST: return {
            ...state,
            loading: true
        }
        case DELETE_OBJ_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            deleted: true
        }
        case DELETE_OBJ_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            deleted: false
        }
        default: return state
    }
}