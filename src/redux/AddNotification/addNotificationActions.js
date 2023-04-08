import { ADD_NOTIFICATION_REQUEST } from './addNotificationTypes'

export const addNotificationRequest = (notification) => {
    return {
        type: ADD_NOTIFICATION_REQUEST,
        notification
    }
}