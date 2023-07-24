import { ADD_OFFER_COURSE_REQUEST, RESET_STATE } from './addOfferCourseTypes'

export const addOfferCourse = (obj) => {
    return {
        type: ADD_OFFER_COURSE_REQUEST,
        obj
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}