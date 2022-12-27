import { ADD_INSTITUTE_REQUEST } from './instituteTypes'

export const addInstituteRequest = (institute) => {
    return {
        type: ADD_INSTITUTE_REQUEST,
        institute
    }
}