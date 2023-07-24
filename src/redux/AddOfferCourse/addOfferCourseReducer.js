import { ADD_OFFER_COURSE_FAILURE, ADD_OFFER_COURSE_REQUEST, ADD_OFFER_COURSE_SUCCESS, RESET_STATE } from './addOfferCourseTypes'

export const addOfferCourseInitialState = {
    loading: false,
    success: '',
    error: '',
    added: null
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
            added: true
        }
        case ADD_OFFER_COURSE_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            added: false
        }
        case RESET_STATE: return {
            ...state,
            added: null
        }
        default: return state
    }
}