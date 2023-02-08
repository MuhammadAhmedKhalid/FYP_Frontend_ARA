import { GET_RESOURCES_REQUEST } from './getResourcesTypes'

export const getResources = (query) => {
    return {
        type: GET_RESOURCES_REQUEST,
        query
    }
}