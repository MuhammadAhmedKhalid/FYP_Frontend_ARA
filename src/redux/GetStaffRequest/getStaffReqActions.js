import { GET_STAFF_REQ_REQUEST } from './getStaffReqTypes'

export const getStaffRequest = (query) => {
    return {
        type: GET_STAFF_REQ_REQUEST,
        query
    }
}