import { DELETE_LEAVE_REQUEST } from './deleteLeaveRequestTypes'

export const deleteLeaveRequest = (query) => {
    return {
        type: DELETE_LEAVE_REQUEST,
        query
    }
}