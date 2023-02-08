import { ADD_OBJECT_REQUEST } from './addObjectTypes'

export const addObjectRequest = (object) => {
    return {
        type: ADD_OBJECT_REQUEST,
        object
    }
}