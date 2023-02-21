import { ADD_POSITION_REQUEST } from './addPositionTypes'

export const addPositionRequest = (position) => {
    return {
        type: ADD_POSITION_REQUEST,
        position
    }
}