import { GET_POSITION_REQUEST } from './getPositionTypes'

export const getPositionRequest = (query) => {
    return {
        type: GET_POSITION_REQUEST,
        query
    }
}