import { DELETE_OBJ_REQ_REQUEST } from './delObjReqTypes'

export const deleteRequestedObj = (query) => {
    return {
        type: DELETE_OBJ_REQ_REQUEST,
        query
    }
}