import { GET_NOTIFICATIONS_REQUEST } from './getNotificationsTypes'

export const getNotificationsRequest = (query) => {
    return {
        type: GET_NOTIFICATIONS_REQUEST,
        query
    }
}