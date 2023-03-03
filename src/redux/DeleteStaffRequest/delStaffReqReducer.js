import { DELETE_STAFF_REQ_FAILURE, DELETE_STAFF_REQ_REQUEST, DELETE_STAFF_REQ_SUCCESS } from './delStaffReqTypes'

export const deleteStaffReqInitialState = {
    loading: false,
    success: '',
    error: '',
    deleted: null
}

export const deleteStaffReqReducer = (state = deleteStaffReqInitialState, action) => {
    switch (action.type) {
        case DELETE_STAFF_REQ_REQUEST: return {
            ...state,
            loading: true
        }
        case DELETE_STAFF_REQ_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            deleted: true
        }
        case DELETE_STAFF_REQ_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            deleted: false
        }
        default: return state
    }
}