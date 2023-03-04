import { GET_OBJS_PER_RES_FAILURE, GET_OBJS_PER_RES_REQUEST, GET_OBJS_PER_RES_SUCCESS } from './getObjsPerResTypes'

const objectsPerResInitialState = {
    loading: false,
    objects: [],
    error: '',
    added: false
}

export const objectsPerResReducer = (state = objectsPerResInitialState, action) => {
    switch (action.type) {
        case GET_OBJS_PER_RES_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_OBJS_PER_RES_SUCCESS: return {
            ...state,
            loading: false,
            objects: action.result,
            error: '',
            added: true
        }
        case GET_OBJS_PER_RES_FAILURE: return {
            ...state,
            loading: false,
            objects: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}