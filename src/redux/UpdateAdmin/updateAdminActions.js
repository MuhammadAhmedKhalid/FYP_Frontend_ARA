import { UPDATE_ADMIN_REQUEST } from './updateAdminTypes'

export const updateAdminRequest = (user_id, user) => {
    return {
        type: UPDATE_ADMIN_REQUEST,
        user_id,
        user
    }
}