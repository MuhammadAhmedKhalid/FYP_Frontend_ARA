import { ADD_WEIGHTAGE_REQUEST } from './addWeightageTypes'

export const addWeightageRequest = (obj) => {
    return {
        type: ADD_WEIGHTAGE_REQUEST,
        obj
    }
}