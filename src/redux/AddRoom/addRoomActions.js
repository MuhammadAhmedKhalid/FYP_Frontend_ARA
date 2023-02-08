import { ADD_ROOM_REQUEST } from './addRoomTypes'

export const addRoomRequest = (room) => {
    return {
        type: ADD_ROOM_REQUEST,
        room
    }
}