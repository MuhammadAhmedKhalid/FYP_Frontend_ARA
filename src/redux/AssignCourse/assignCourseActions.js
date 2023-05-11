import { ASSIGN_COURSE_REQUEST, RESET_STATE } from './assignCourseTypes'

export const assignCourseRequest = (assignCourse, obj, lst) => {
    return {
        type: ASSIGN_COURSE_REQUEST,
        assignedCourse: assignCourse,
        room_Request: obj,
        staff_Request: obj,
        dates_lst: lst
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}