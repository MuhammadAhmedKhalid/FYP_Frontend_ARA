import { JACCARD_FAILURE, JACCARD_REQUEST, JACCARD_SUCCESS } from './jaccardTypes'

const jaccardInitialState = {
    loading: false,
    faculty_id: 0,
    error: '',
    added: false
}

export const jaccardReducer = (state = jaccardInitialState, action) => {
    switch (action.type) {
        case JACCARD_REQUEST: return {
            ...state,
            loading: true
        }
        case JACCARD_SUCCESS: return {
            ...state,
            loading: false,
            faculty_id: action.result,
            error: '',
            added: true
        }
        case JACCARD_FAILURE: return {
            ...state,
            loading: false,
            faculty_id: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}