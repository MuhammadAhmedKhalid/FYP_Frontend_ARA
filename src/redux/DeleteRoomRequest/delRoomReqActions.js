import { DELETE_ROOM_REQ_REQUEST } from './delRoomReqTypes'

export const deleteRequestedRoom = (query) => {
    return {
        type: DELETE_ROOM_REQ_REQUEST,
        query
    }
}