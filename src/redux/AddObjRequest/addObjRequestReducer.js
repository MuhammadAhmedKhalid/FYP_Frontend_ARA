import { ADD_OBJ_REQ_FAILURE, ADD_OBJ_REQ_REQUEST, ADD_OBJ_REQ_SUCCESS, RESET_STATE } from './addObjRequestTypes'

export const addObjReqInitialState = {
    loading: false,
    success: '',
    error: '',
    added: null
}

export const addObjReqReducer = (state = addObjReqInitialState, action) => {
    switch (action.type) {
        case ADD_OBJ_REQ_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_OBJ_REQ_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            added: true
        }
        case ADD_OBJ_REQ_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            added: false
        }
        case RESET_STATE: return {
            ...state,
            added: null
        }
        default: return state
    }
}