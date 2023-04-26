import { UPDATE_POSITION_REQUEST } from './updatePositionTypes'

export const updatePosition = (position_id, position_name) => {
    return {
        type: UPDATE_POSITION_REQUEST,
        position_id,
        position_name
    }
}