import { ADD_ROOM_REQ_REQUEST } from './roomRequestTypes'

export const addRequestedRoom = (room) => {
    return {
        type: ADD_ROOM_REQ_REQUEST,
        room
    }
}