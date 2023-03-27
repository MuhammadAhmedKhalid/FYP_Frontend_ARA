import { ADD_LEAVE_FAILURE, ADD_LEAVE_REQUEST, ADD_LEAVE_SUCCESS } from './addLeaveRequestTypes'

export const addLeaveInitialState = {
    loading: false,
    success: '',
    error: '',
    added: false
}

export const addLeaveReducer = (state = addLeaveInitialState, action) => {
    switch (action.type) {
        case ADD_LEAVE_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_LEAVE_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            added: true
        }
        case ADD_LEAVE_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            added: false
        }
        default: return state
    }
}