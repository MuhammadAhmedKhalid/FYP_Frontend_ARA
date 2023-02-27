import { ADD_STAFF_REQ_REQUEST } from './staffRequestTypes'

export const addRequestedStaff = (staff) => {
    return {
        type: ADD_STAFF_REQ_REQUEST,
        staff
    }
}