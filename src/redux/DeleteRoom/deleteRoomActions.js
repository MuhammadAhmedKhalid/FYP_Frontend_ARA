import { DELETE_ROOM_REQUEST } from './deleteRoomTypes'

export const deleteRoomRequest = (query) => {
    return {
        type: DELETE_ROOM_REQUEST,
        query
    }
}