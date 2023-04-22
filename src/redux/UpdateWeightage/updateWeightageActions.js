import { UPDATE_WEIGHTAGE_REQUEST } from './updateWeightageTypes'

export const updateWeightage = (weightageId) => {
    return {
        type: UPDATE_WEIGHTAGE_REQUEST,
        weightageId
    }
}