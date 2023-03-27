import { GET_LEAVE_FAILURE, GET_LEAVE_REQUEST, GET_LEAVE_SUCCESS } from './getLeaveRequestTypes'

const leaveRequestInitialState = {
    loading: false,
    requestedLeaves: [],
    error: '',
    added: false
}

export const leaveReqReducer = (state = leaveRequestInitialState, action) => {
    switch (action.type) {
        case GET_LEAVE_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_LEAVE_SUCCESS: return {
            ...state,
            loading: false,
            requestedLeaves: action.result,
            error: '',
            added: true
        }
        case GET_LEAVE_FAILURE: return {
            ...state,
            loading: false,
            requestedLeaves: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}