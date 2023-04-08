import { GET_NOTIFICATIONS_FAILURE, GET_NOTIFICATIONS_REQUEST, GET_NOTIFICATIONS_SUCCESS } from './getNotificationsTypes'

const notificationsRequestInitialState = {
    loading: false,
    notifications: [],
    error: '',
    added: false
}

export const notificationsReqReducer = (state = notificationsRequestInitialState, action) => {
    switch (action.type) {
        case GET_NOTIFICATIONS_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_NOTIFICATIONS_SUCCESS: return {
            ...state,
            loading: false,
            notifications: action.result,
            error: '',
            added: true
        }
        case GET_NOTIFICATIONS_FAILURE: return {
            ...state,
            loading: false,
            notifications: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}