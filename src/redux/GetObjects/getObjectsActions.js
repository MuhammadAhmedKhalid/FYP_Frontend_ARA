import { GET_OBJECTS_REQUEST } from './getObjectsTypes'

export const getObjectsRequest = (query) => {
    return {
        type: GET_OBJECTS_REQUEST,
        query
    }
}