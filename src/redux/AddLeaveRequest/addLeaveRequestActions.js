import { ADD_LEAVE_REQUEST } from './addLeaveRequestTypes'

export const addLeave = (leave, courseName) => {
    return {
        type: ADD_LEAVE_REQUEST,
        leaveRequest: leave,
        courseName
    }
}