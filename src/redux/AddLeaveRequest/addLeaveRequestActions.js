import { ADD_LEAVE_REQUEST } from './addLeaveRequestTypes'

export const addLeave = (leave, courseName, availableFaculty) => {
    return {
        type: ADD_LEAVE_REQUEST,
        leaveRequest: leave,
        availableFaculty,
        courseName
    }
}