import { JACCARD_REQUEST } from './jaccardTypes'

export const jaccardRequest = (facultyList) => {
    return {
        type: JACCARD_REQUEST,
        facultyList
    }
}