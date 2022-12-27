import { GET_INSTITUTES_FAILURE, GET_INSTITUTES_REQUEST, GET_INSTITUTES_SUCCESS } from './getInstitutesTypes'

const institutesInitialState = {
    loading: false,
    institutes: [],
    error: '',
    added: false
}

export const institutesReducer = (state = institutesInitialState, action) => {
    switch (action.type) {
        case GET_INSTITUTES_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_INSTITUTES_SUCCESS: return {
            ...state,
            loading: false,
            institutes: action.data,
            error: '',
            added: true
        }
        case GET_INSTITUTES_FAILURE: return {
            ...state,
            loading: false,
            institutes: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}