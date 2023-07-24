import { ADD_OFFER_COURSE_FAILURE, ADD_OFFER_COURSE_REQUEST, ADD_OFFER_COURSE_SUCCESS } from './addOfferCourseTypes'

export const addOfferCourseInitialState = {
    loading: false,
    success: '',
    error: '',
}

export const addOfferCourseReducer = (state = addOfferCourseInitialState, action) => {
    switch (action.type) {
        case ADD_OFFER_COURSE_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_OFFER_COURSE_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
        }
        case ADD_OFFER_COURSE_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
        }
        default: return state
    }
}