import { ADD_LEAVE_REQUEST } from './addLeaveRequestTypes'

export const addLeave = (leave, coursesList, availableFacultyList) => {
    return {
        type: ADD_LEAVE_REQUEST,
        leaveRequest: leave,
        availableFacultyList,
        coursesList
    }
}