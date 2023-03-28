import { DELETE_LEAVE_FAILURE, DELETE_LEAVE_REQUEST, DELETE_LEAVE_SUCCESS } from './deleteLeaveRequestTypes'

export const deleteLeaveRequestInitialState = {
    loading: false,
    success: '',
    error: '',
    deleted: null
}

export const deleteLeaveRequestReducer = (state = deleteLeaveRequestInitialState, action) => {
    switch (action.type) {
        case DELETE_LEAVE_REQUEST: return {
            ...state,
            loading: true
        }
        case DELETE_LEAVE_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            deleted: true
        }
        case DELETE_LEAVE_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            deleted: false
        }
        default: return state
    }
}