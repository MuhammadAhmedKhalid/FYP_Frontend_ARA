import { ADD_NOTIFICATION_FAILURE, ADD_NOTIFICATION_REQUEST, ADD_NOTIFICATION_SUCCESS } from './addNotificationTypes'

export const addNotificationInitialState = {
    loading: false,
    success: '',
    error: '',
    added: null,
}

export const addNotificationReducer = (state = addNotificationInitialState, action) => {
    switch (action.type) {
        case ADD_NOTIFICATION_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_NOTIFICATION_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            added: true
        }
        case ADD_NOTIFICATION_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            added: false
        }
        default: return state
    }
}