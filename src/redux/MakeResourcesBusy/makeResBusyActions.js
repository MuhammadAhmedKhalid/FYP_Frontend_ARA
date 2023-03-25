import { MAKE_RES_BUSY_REQUEST } from './makeResBusyTypes'

export const makeResBusy = (obj, lst) => {
    return {
        type: MAKE_RES_BUSY_REQUEST,
        obj,
        lst
    }
}