import { GET_LEAVE_REQUEST } from './getLeaveRequestTypes'

export const getLeaveRequest = (query) => {
    return {
        type: GET_LEAVE_REQUEST,
        query
    }
}