import { UPDATE_POSITION_REQUEST, RESET_STATE } from './updatePositionTypes'

export const updatePosition = (position_id, position_name) => {
    return {
        type: UPDATE_POSITION_REQUEST,
        position_id,
        position_name
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}