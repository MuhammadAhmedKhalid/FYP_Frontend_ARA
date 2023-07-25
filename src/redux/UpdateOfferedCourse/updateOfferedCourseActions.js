import { UPDATE_OFFERED_COURSE_REQUEST, RESET_STATE } from './updateOfferedCourseTypes'

export const updateOfferedCourse = (offerCourseId, offerCourse) => {
    return {
        type: UPDATE_OFFERED_COURSE_REQUEST,
        offerCourseId,
        offerCourse
    }
}
export const resetState = () => {
    return {
        type: RESET_STATE
    }
}