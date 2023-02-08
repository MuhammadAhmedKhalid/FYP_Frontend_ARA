import { GET_RESOURCE_TYPES_FAILURE, GET_RESOURCE_TYPES_REQUEST, GET_RESOURCE_TYPES_SUCCESS } from './getResourceTypes'

const resourceTypesInitialState = {
    loading: false,
    resource_types: [],
    error: '',
    added: false
}

export const resourceTypeReducer = (state = resourceTypesInitialState, action) => {
    switch (action.type) {
        case GET_RESOURCE_TYPES_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_RESOURCE_TYPES_SUCCESS: return {
            ...state,
            loading: false,
            resource_types: action.result,
            error: '',
            added: true
        }
        case GET_RESOURCE_TYPES_FAILURE: return {
            ...state,
            loading: false,
            resource_types: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}