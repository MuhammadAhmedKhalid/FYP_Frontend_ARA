import { ADD_ROOM_REQUEST, RESET_STATE } from './addRoomTypes'

export const addRoomRequest = (room) => {
    return {
        type: ADD_ROOM_REQUEST,
        room
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}