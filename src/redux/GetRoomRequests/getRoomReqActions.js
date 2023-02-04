import { GET_ROOM_REQ_REQUEST } from './getRoomReqTypes'

export const getRoomRequest = (query) => {
    return {
        type: GET_ROOM_REQ_REQUEST,
        query
    }
}