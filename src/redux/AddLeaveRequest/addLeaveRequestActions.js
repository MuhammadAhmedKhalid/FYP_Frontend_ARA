import { ADD_LEAVE_REQUEST } from './addLeaveRequestTypes'

export const addLeave = (leaveRequest) => {
    return {
        type: ADD_LEAVE_REQUEST,
        leaveRequest
    }
}