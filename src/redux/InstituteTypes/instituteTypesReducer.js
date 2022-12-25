import { GET_INSTITUTE_TYPE_FAILURE, GET_INSTITUTE_TYPE_REQUEST, GET_INSTITUTE_TYPE_SUCCESS } from "./instituteTypes_Types"

export const instituteTypeInitialState = {
    loading: false,
    instituteTypes: [],
    error: ''
}

export const instituteTypesReducer = (state = instituteTypeInitialState, action) => {
    switch (action.type) {
        case GET_INSTITUTE_TYPE_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_INSTITUTE_TYPE_SUCCESS: return {
            ...state,
            loading: false,
            instituteTypes: action.data,
            error: ''
        }
        case GET_INSTITUTE_TYPE_FAILURE: return {
            ...state,
            loading: false,
            instituteTypes: [],
            error: action.message
        }
        default: return state
    }
}