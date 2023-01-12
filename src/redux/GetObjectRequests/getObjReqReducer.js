import { GET_OBJ_REQ_FAILURE, GET_OBJ_REQ_REQUEST, GET_OBJ_REQ_SUCCESS } from './getObjReqTypes'

const objReqInitialState = {
    loading: false,
    obj_requests: [],
    error: '',
    added: false
}

export const objReqReducer = (state = objReqInitialState, action) => {
    switch (action.type) {
        case GET_OBJ_REQ_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_OBJ_REQ_SUCCESS: return {
            ...state,
            loading: false,
            obj_requests: action.data,
            error: '',
            added: true
        }
        case GET_OBJ_REQ_FAILURE: return {
            ...state,
            loading: false,
            obj_requests: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}