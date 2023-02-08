import { GET_RESOURCE_TYPES_REQUEST } from './getResourceTypes'

export const getResourceTypesRequest = (query) => {
    return {
        type: GET_RESOURCE_TYPES_REQUEST,
        query
    }
}