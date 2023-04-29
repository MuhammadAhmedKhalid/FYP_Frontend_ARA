import { DELETE_OBJ_REQUEST } from './deleteObjTypes'

export const deleteObjRequest = (query) => {
    return {
        type: DELETE_OBJ_REQUEST,
        query
    }
}