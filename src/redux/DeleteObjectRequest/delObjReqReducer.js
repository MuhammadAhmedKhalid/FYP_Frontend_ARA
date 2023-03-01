import { DELETE_OBJ_REQ_FAILURE, DELETE_OBJ_REQ_REQUEST, DELETE_OBJ_REQ_SUCCESS } from './delObjReqTypes'

export const deleteObjReqInitialState = {
    loading: false,
    success: '',
    error: '',
    deleted: null
}

export const deleteObjReqReducer = (state = deleteObjReqInitialState, action) => {
    switch (action.type) {
        case DELETE_OBJ_REQ_REQUEST: return {
            ...state,
            loading: true
        }
        case DELETE_OBJ_REQ_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            deleted: true
        }
        case DELETE_OBJ_REQ_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            deleted: false
        }
        default: return state
    }
}