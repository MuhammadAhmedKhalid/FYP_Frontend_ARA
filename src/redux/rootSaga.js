import { fork } from 'redux-saga/effects';
import { signupSaga } from './Signup/signupSaga'
import { loginSaga } from './Login/loginSaga'
import { instituteTypeSaga } from './InstituteTypes/instituteTypesSaga'
import { instituteSaga } from './AddInstitute/instituteSaga'
import { getInstitutesSaga } from './GetInstitutes/getInstitutesSaga'
import { addFacultySaga } from './AddFaculty/addFacultySaga'
import { getFacultySaga } from './GetFaculty/getFacultySaga'
import { getRoomReqSaga } from './GetRoomRequests/getRoomReqSaga'
import { getDepartmentsSaga } from './GetDepartments/getDepartmentsSaga'
import { getRoomsSaga } from './GetRooms/getRoomsSaga'
import { addRoomRequestSaga } from './AddRoomRequest/roomRequestSaga'
import { getResourceTypesSaga } from './GetResourceTypes/getResourceSaga'
import { getResourcesSaga } from './GetResources/getResourcesSaga'
import { getObjReqSaga } from './GetObjectRequests/getObjReqSaga'
import { addObjRequestSaga } from './AddObjRequest/addObjRequestSaga'
import { getObjectsSaga } from './GetObjects/getObjectsSaga'
import { addDepartmentSaga } from './AddDepartment/addDepartmentSaga'
import { addRoomSaga } from './AddRoom/addRoomSaga'
import { addObjectSaga } from './AddObject/addObjectSaga'
import { addPositionSaga } from './AddPosition/addPositionSaga'
import { addCourseSaga } from './AddCourse/addCourseSaga'
import { getPositionSaga } from './GetPosition/getPositionSaga'
import { getCourseSaga } from './GetCourse/getCourseSaga'
import { addStaffRequestSaga } from './AddStaffRequest/staffRequestSaga'
import { getStaffReqSaga } from './GetStaffRequest/getStaffReqSaga'
import { deleteObjRequestSaga } from './DeleteObjectRequest/delObjReqSaga'
import { deleteRoomRequestSaga } from './DeleteRoomRequest/delRoomReqSaga'
import { deleteStaffRequestSaga } from './DeleteStaffRequest/delStaffReqSaga'
import { getObjectsPerResSaga } from './GetObjsPerResourceType/getObjsPerResSaga'
import { addBatchSaga } from './AddBatch/addBatchSaga'
import { getBatchesSaga } from './GetBatches/getBatchesSaga'
import { assignCourseSaga } from './AssignCourse/assignCourseSaga'
import { assignedCoursesSaga } from './AssignedCourses/assignedCoursesSaga'
import { assignedCoursesForTableSaga } from './AssignedCoursesForTable/assignedCoursesForTableSaga'
import { addLeaveRequestSaga } from './AddLeaveRequest/addLeaveRequestSaga'
import { getLeaveReqSaga } from './GetLeaveRequests/getLeaveRequestSaga'
import { deleteLeaveRequestSaga } from './DeleteLeaveRequest/deleteLeaveRequestSaga'
import { jaccardSaga } from './Jaccard/jaccardSaga'
import { updateAssignedCourseSaga } from './UpdateAssignedCourse/updateAssignedCourseSaga'
import { deleteAssignedCourseSaga } from './DeleteAssignedCourse/deleteAssignedCourseSaga'
import { addNotificationSaga } from './AddNotification/addNotificationSaga'
import { getNotificationsReqSaga } from './GetNotifications/getNotificationsSaga'
import { addWeightageSaga } from './AddWeightage/addWeightageSaga'
import { getWeightagesSaga } from './GetWeightages/getWeightageSaga'
import { updateWeightageSaga } from './UpdateWeightage/updateWeightageSaga'
import { updateDepartmentSaga } from './UpdateDepartment/updateDeptSaga'
import { updateBatchSaga } from './UpdateBatch/updateBatchSaga'
import { updateRoomSaga } from './UpdateRoom/updateRoomSaga'
import { updatePositionSaga } from './UpdatePosition/updatePositionSaga'
import { updateCourseSaga } from './UpdateCourse/updateCourseSaga'
import { updateFacultySaga } from './UpdateFaculty/updateFacultySaga'
import { deleteDepartmentSaga } from './DeleteDepartment/deleteDeptSaga'
import { deleteBatchSaga } from './DeleteBatch/deleteBatchSaga'
import { deleteRoomSaga } from './DeleteRoom/deleteRoomSaga'
import { deletePositionSaga } from './DeletePosition/deletePositionSaga'
import { deleteCourseSaga } from './DeleteCourse/deleteCourseSaga'
import { deleteObjSaga } from './DeleteObject/deleteObjSaga'
import { deleteFacultySaga } from './DeleteFaculty/deleteFacultySaga'
import { deleteAssignedCoursesSaga } from './DeleteAssignedCourses/deleteAssignedCoursesSaga'
import { checkTokenSaga } from './CheckTokenValidity/checkValiditySaga'
import { updateAdminSaga } from './UpdateAdmin/updateAdminSaga'
import { updateInstituteSaga } from './UpdateInstitute/updateInstituteSaga'
import { addFacultyConstraintsSaga } from './AddFacultyConstraints/addFacultyConstraintsSaga'
import { getFacultyConstraintsSaga } from './GetFacultyConstraints/getFacultyConstraintsSaga'
import { addOfferCourseSaga } from './AddOfferCourse/addOfferCourseSaga'
import { getOfferedCoursesSaga } from './GetOfferedCourses/getOfferedCoursesSaga'
import { deleteOfferedCourseSaga } from './DeleteOfferedCourse/deleteOfferedCourseSaga'
import { updateOfferedCourseSaga } from './UpdateOfferedCourse/updateOfferedCourseSaga'
import { addAllocateFacultySaga } from './AddAllocateFaculty/allocateFacultySaga'
import { getAllocatedFacultySaga } from './GetAllocatedFaculty/allocatedFacultySaga'

export function* rootSaga() {
    yield fork(signupSaga)
    yield fork(loginSaga)
    yield fork(instituteTypeSaga)
    yield fork(instituteSaga)
    yield fork(getInstitutesSaga)
    yield fork(addFacultySaga)
    yield fork(getFacultySaga)
    yield fork(getRoomReqSaga)
    yield fork(getDepartmentsSaga)
    yield fork(getRoomsSaga)
    yield fork(addRoomRequestSaga)
    yield fork(getResourceTypesSaga)
    yield fork(getResourcesSaga)
    yield fork(getObjReqSaga)
    yield fork(addObjRequestSaga)
    yield fork(getObjectsSaga)
    yield fork(addDepartmentSaga)
    yield fork(addRoomSaga)
    yield fork(addObjectSaga)
    yield fork(addPositionSaga)
    yield fork(addCourseSaga)
    yield fork(getPositionSaga)
    yield fork(getCourseSaga)
    yield fork(addStaffRequestSaga)
    yield fork(getStaffReqSaga)
    yield fork(deleteObjRequestSaga)
    yield fork(deleteRoomRequestSaga)
    yield fork(deleteStaffRequestSaga)
    yield fork(getObjectsPerResSaga)
    yield fork(addBatchSaga)
    yield fork(getBatchesSaga)
    yield fork(assignCourseSaga)
    yield fork(assignedCoursesSaga)
    yield fork(assignedCoursesForTableSaga)
    yield fork(addLeaveRequestSaga)
    yield fork(getLeaveReqSaga)
    yield fork(deleteLeaveRequestSaga)
    yield fork(jaccardSaga)
    yield fork(updateAssignedCourseSaga)
    yield fork(deleteAssignedCourseSaga)
    yield fork(addNotificationSaga)
    yield fork(getNotificationsReqSaga)
    yield fork(addWeightageSaga)
    yield fork(getWeightagesSaga)
    yield fork(updateWeightageSaga)
    yield fork(updateDepartmentSaga)
    yield fork(updateBatchSaga)
    yield fork(updateRoomSaga)
    yield fork(updatePositionSaga)
    yield fork(updateCourseSaga)
    yield fork(updateFacultySaga)
    yield fork(deleteDepartmentSaga)
    yield fork(deleteBatchSaga)
    yield fork(deleteRoomSaga)
    yield fork(deletePositionSaga)
    yield fork(deleteCourseSaga)
    yield fork(deleteObjSaga)
    yield fork(deleteFacultySaga)
    yield fork(deleteAssignedCoursesSaga)
    yield fork(checkTokenSaga)
    yield fork(updateAdminSaga)
    yield fork(updateInstituteSaga)
    yield fork(addFacultyConstraintsSaga)
    yield fork(getFacultyConstraintsSaga)
    yield fork(addOfferCourseSaga)
    yield fork(getOfferedCoursesSaga)
    yield fork(deleteOfferedCourseSaga)
    yield fork(updateOfferedCourseSaga)
    yield fork(addAllocateFacultySaga)
    yield fork(getAllocatedFacultySaga)
}