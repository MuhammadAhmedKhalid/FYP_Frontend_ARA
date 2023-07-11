export function checkConflict(req_start_time, db_start_time, req_end_time, db_end_time,
    req_sTime, db_sTime, req_eTime, db_eTime) {

        if ((req_sTime === db_eTime || req_eTime === db_sTime)) {
            return false;
        }

        if ((Math.min(req_start_time, req_end_time) <= Math.max(db_start_time, db_end_time) &&
            Math.max(req_start_time, req_end_time) >= Math.min(db_start_time, db_end_time))) {
            return true;
        }

    return false;
}