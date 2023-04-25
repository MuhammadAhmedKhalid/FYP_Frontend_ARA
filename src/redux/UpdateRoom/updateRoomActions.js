import { UPDATE_ROOM_REQUEST } from './updateRoomTypes'

export const updateRoom = (room_id, department_id, room_name) => {
    return {
        type: UPDATE_ROOM_REQUEST,
        department_id,
        room_name
    }
}