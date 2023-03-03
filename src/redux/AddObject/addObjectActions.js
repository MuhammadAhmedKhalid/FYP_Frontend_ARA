import { ADD_OBJECT_REQUEST, RESET_STATE } from './addObjectTypes'

export const addObjectRequest = (object) => {
    return {
        type: ADD_OBJECT_REQUEST,
        object
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}