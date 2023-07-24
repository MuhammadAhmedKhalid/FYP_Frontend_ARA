import { ADD_OFFER_COURSE_REQUEST } from './addOfferCourseTypes'

export const addOfferCourse = (obj) => {
    return {
        type: ADD_OFFER_COURSE_REQUEST,
        obj
    }
}