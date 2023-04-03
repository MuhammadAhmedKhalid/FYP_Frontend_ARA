import { UPDATE_ASSIGNED_COURSE_REQUEST } from './updateAssignedCourseTypes'

export const updateAssignedCourse = (institute_id, assignedCourseId, faculty_id) => {
    return {
        type: UPDATE_ASSIGNED_COURSE_REQUEST,
        institute_id,
        assignedCourseId,
        faculty_id
    }
}