import { ADD_STAFF_REQ_FAILURE, ADD_STAFF_REQ_REQUEST, ADD_STAFF_REQ_SUCCESS } from './staffRequestTypes'

export const addStaffReqInitialState = {
    loading: false,
    success: '',
    error: '',
    added: false
}

export const addStaffReqeReducer = (state = addStaffReqInitialState, action) => {
    switch (action.type) {
        case ADD_STAFF_REQ_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_STAFF_REQ_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            added: true
        }
        case ADD_STAFF_REQ_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            added: false
        }
        default: return state
    }
}