import { ADD_OBJ_REQ_REQUEST } from './addObjRequestTypes'

export const addRequestedObj = (obj) => {
    return {
        type: ADD_OBJ_REQ_REQUEST,
        obj
    }
}