import { UPDATE_ROOM_REQUEST, RESET_STATE } from './updateRoomTypes'

export const updateRoom = (room_id, department_id, room) => {
    return {
        type: UPDATE_ROOM_REQUEST,
        room_id,
        department_id,
        room
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}