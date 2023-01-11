import { GET_RESOURCES_FAILURE, GET_RESOURCES_REQUEST, GET_RESOURCES_SUCCESS } from './getResourcesTypes'

const getResourcesInitialState = {
    loading: false,
    resources: [],
    error: '',
    added: false
}

export const resourcesReducer = (state = getResourcesInitialState, action) => {
    switch (action.type) {
        case GET_RESOURCES_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_RESOURCES_SUCCESS: return {
            ...state,
            loading: false,
            resources: action.data,
            error: '',
            added: true
        }
        case GET_RESOURCES_FAILURE: return {
            ...state,
            loading: false,
            resources: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}