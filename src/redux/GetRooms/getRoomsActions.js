import { GET_ROOMS_REQUEST } from './getRoomsTypes'

export const getRoomsRequest = (query) => {
    return {
        type: GET_ROOMS_REQUEST,
        query
    }
}