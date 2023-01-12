import { ADD_OBJ_REQ_REQUEST, RESET_STATE } from './addObjRequestTypes'

export const addRequestedObj = (obj) => {
    return {
        type: ADD_OBJ_REQ_REQUEST,
        obj
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}