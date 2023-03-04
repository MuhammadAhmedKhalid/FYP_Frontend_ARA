import { GET_OBJS_PER_RES_REQUEST } from './getObjsPerResTypes'

export const getObjectsPerResRequest = (query) => {
    return {
        type: GET_OBJS_PER_RES_REQUEST,
        query
    }
}