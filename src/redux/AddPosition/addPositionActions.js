import { ADD_POSITION_REQUEST, RESET_STATE } from './addPositionTypes'

export const addPositionRequest = (position) => {
    return {
        type: ADD_POSITION_REQUEST,
        position
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}