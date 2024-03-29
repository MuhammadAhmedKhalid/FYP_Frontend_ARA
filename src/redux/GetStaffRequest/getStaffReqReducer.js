import { GET_STAFF_REQ_FAILURE, GET_STAFF_REQ_REQUEST, GET_STAFF_REQ_SUCCESS } from './getStaffReqTypes'

const staffRequestInitialState = {
    loading: false,
    staff_req: [],
    error: '',
    added: false
}

export const staffReqReducer = (state = staffRequestInitialState, action) => {
    switch (action.type) {
        case GET_STAFF_REQ_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_STAFF_REQ_SUCCESS: return {
            ...state,
            loading: false,
            staff_req: action.result,
            error: '',
            added: true
        }
        case GET_STAFF_REQ_FAILURE: return {
            ...state,
            loading: false,
            staff_req: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}