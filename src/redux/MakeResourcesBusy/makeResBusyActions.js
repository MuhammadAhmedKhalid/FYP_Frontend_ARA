import { MAKE_RES_BUSY_REQUEST } from './makeResBusyTypes'

export const makeResBusy = (obj, lst) => {
    return {
        type: MAKE_RES_BUSY_REQUEST,
        room_Request: obj,
        staff_Request: obj,
        dates_lst: lst
    }
}