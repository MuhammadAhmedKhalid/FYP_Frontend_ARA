export function checkConflict(db_room_id, req_room_id, db_room_date, req_room_date,
    req_start_time, db_room_start_time, req_end_time, db_room_end_time,
    req_sTime, db_sTime, req_eTime, db_eTime) {

    if ((db_room_id === req_room_id && req_room_date === db_room_date)) {
        if ((req_sTime === db_eTime || req_eTime === db_sTime)) { }
        if ((Math.min(req_start_time, req_end_time) <= Math.max(db_room_start_time, db_room_end_time) &&
            Math.max(req_start_time, req_end_time) >= Math.min(db_room_start_time, db_room_end_time))) {
            return true;
        }
    }
    return false;
}