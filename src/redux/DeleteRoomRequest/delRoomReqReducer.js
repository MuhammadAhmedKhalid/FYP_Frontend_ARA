import { DELETE_ROOM_REQ_FAILURE, DELETE_ROOM_REQ_REQUEST, DELETE_ROOM_REQ_SUCCESS } from './delRoomReqTypes'

export const deleteRoomReqInitialState = {
    loading: false,
    success: '',
    error: '',
    deleted: null
}

export const deleteRoomReqReducer = (state = deleteRoomReqInitialState, action) => {
    switch (action.type) {
        case DELETE_ROOM_REQ_REQUEST: return {
            ...state,
            loading: true
        }
        case DELETE_ROOM_REQ_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            deleted: true
        }
        case DELETE_ROOM_REQ_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            deleted: false
        }
        default: return state
    }
}