import { ASSIGN_COURSE_REQUEST, RESET_STATE } from './assignCourseTypes'

export const assignCourseRequest = (assignCourse, obj, offerCourseId) => {
    return {
        type: ASSIGN_COURSE_REQUEST,
        assignedCourse: assignCourse,
        room_Request: obj,
        staff_Request: obj,
        offerCourseId
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}