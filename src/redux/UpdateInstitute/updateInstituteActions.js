import { UPDATE_INSTITUTE_REQUEST } from './updateInstituteTypes'

export const updateInstitute = (institute_id, institute) => {
    return {
        type: UPDATE_INSTITUTE_REQUEST,
        institute_id,
        institute
    }
}