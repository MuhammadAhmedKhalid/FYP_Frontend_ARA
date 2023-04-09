import { ADD_WEIGHTAGE_REQUEST } from './addWeightageTypes'

export const addWeightageRequest = (weightage) => {
    return {
        type: ADD_WEIGHTAGE_REQUEST,
        weightage
    }
}