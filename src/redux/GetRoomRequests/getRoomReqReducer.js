import { GET_ROOM_REQ_FAILURE, GET_ROOM_REQ_REQUEST, GET_ROOM_REQ_SUCCESS } from './getRoomReqTypes'

const roomRequestInitialState = {
    loading: false,
    room_req: [],
    error: '',
    added: false
}

export const roomReqReducer = (state = roomRequestInitialState, action) => {
    switch (action.type) {
        case GET_ROOM_REQ_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_ROOM_REQ_SUCCESS: return {
            ...state,
            loading: false,
            room_req: action.result,
            error: '',
            added: true
        }
        case GET_ROOM_REQ_FAILURE: return {
            ...state,
            loading: false,
            room_req: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}