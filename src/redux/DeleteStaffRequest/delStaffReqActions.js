import { DELETE_STAFF_REQ_REQUEST } from './delStaffReqTypes'

export const deleteRequestedStaff = (query) => {
    return {
        type: DELETE_STAFF_REQ_REQUEST,
        query
    }
}