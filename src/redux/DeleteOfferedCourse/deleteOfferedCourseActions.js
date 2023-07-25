import { DELETE_OFFERED_COURSE_REQUEST, RESET_STATE } from './deleteOfferedCourseTypes'

export const deleteOfferedCourseRequest = (query) => {
    return {
        type: DELETE_OFFERED_COURSE_REQUEST,
        query
    }
}

export const resetDeleteState = () => {
    return {
        type: RESET_STATE
    }
}