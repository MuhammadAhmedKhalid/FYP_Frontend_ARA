import { ADD_LEAVE_REQUEST } from './addLeaveRequestTypes'

export const addLeave = (leave) => {
    return {
        type: ADD_LEAVE_REQUEST,
        leave
    }
}