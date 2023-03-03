import { GET_OBJECTS_FAILURE, GET_OBJECTS_REQUEST, GET_OBJECTS_SUCCESS } from './getObjectsTypes'

const objectssInitialState = {
    loading: false,
    objects: [],
    error: '',
    added: false
}

export const objectsReducer = (state = objectssInitialState, action) => {
    switch (action.type) {
        case GET_OBJECTS_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_OBJECTS_SUCCESS: return {
            ...state,
            loading: false,
            objects: action.result,
            error: '',
            added: true
        }
        case GET_OBJECTS_FAILURE: return {
            ...state,
            loading: false,
            objects: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}