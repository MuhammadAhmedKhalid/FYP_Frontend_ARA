import { GET_ADMIN_REQUEST } from './getAdminTypes'

export const getAdminRequest = (query) => {
    return {
        type: GET_ADMIN_REQUEST,
        query
    }
}