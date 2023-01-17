export function checkConflict(db_id, req_id, db_date, req_date,
    req_start_time, db_start_time, req_end_time, db_end_time,
    req_sTime, db_sTime, req_eTime, db_eTime) {

    if ((db_id === req_id && db_date === req_date)) {

        // req: 1-2 db: 2-3 
        if ((req_sTime === db_eTime || req_eTime === db_sTime)) {
            return false;
        }

        // 1:30 - 2:00 requested
        // 1:00 - 2:05 db
        // 1:30 <= 2:05 && 2:00 >= 1:00
        if ((Math.min(req_start_time, req_end_time) <= Math.max(db_start_time, db_end_time) &&
            Math.max(req_start_time, req_end_time) >= Math.min(db_start_time, db_end_time))) {
            return true;
        }
    }
    return false;
}