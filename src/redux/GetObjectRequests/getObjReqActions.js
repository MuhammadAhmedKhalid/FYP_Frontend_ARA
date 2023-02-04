import { GET_OBJ_REQ_REQUEST } from './getObjReqTypes'

export const getObjReqRequest = (query) => {
    return {
        type: GET_OBJ_REQ_REQUEST,
        query
    }
}