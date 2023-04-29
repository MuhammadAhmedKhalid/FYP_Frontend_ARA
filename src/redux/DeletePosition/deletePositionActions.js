import { DELETE_POSITION_REQUEST } from './deletePositionTypes'

export const deletePositionRequest = (query) => {
    return {
        type: DELETE_POSITION_REQUEST,
        query
    }
}