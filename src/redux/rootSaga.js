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
import { addSpecializationSaga } from './AddSpecialization/addSpecializationSaga'

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
    yield fork(addSpecializationSaga)
}