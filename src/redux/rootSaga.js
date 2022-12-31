import { fork } from 'redux-saga/effects';
import { signupSaga } from './Signup/signupSaga'
import { loginSaga } from './Login/loginSaga'
import { instituteTypeSaga } from './InstituteTypes/instituteTypesSaga'
import { instituteSaga } from './AddInstitute/instituteSaga'
import { getInstitutesSaga } from './GetInstitutes/getInstitutesSaga'
import { getAdminSaga } from './GetAdmin/getAdminSaga'
import { addFacultySaga } from './AddFaculty/addFacultySaga'

export function* rootSaga() {
    yield fork(signupSaga)
    yield fork(loginSaga)
    yield fork(instituteTypeSaga)
    yield fork(instituteSaga)
    yield fork(getInstitutesSaga)
    yield fork(getAdminSaga)
    yield fork(addFacultySaga)
}