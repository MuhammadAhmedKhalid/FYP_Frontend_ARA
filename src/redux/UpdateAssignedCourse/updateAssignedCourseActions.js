import { UPDATE_ASSIGNED_COURSE_REQUEST } from './updateAssignedCourseTypes'

export const updateAssignedCourse = (assignedCourse, addRoomRequest, faculty_id) => {
    return {
        type: UPDATE_ASSIGNED_COURSE_REQUEST,
        assignedCourse,
        faculty_id,
        addRoomRequest
    }
}