import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/Root/LandingPage';
import Modal from 'react-modal'
import NoMatch from './components/Root/NoMatch';
import Domains from './components/Root/Domains';
import AdminHomeScreen from './components/Admin/AdminHomeScreen';
import Departments from './components/Admin/resources/Departments';
import Batches from './components/Admin/resources/Batches';
import Objects from './components/Admin/resources/Objects';
import Rooms from './components/Admin/resources/Rooms';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import Faculty from './components/Admin/resources/Faculty';
import FacultyHomeScreen from './components/Faculty/FacultyHomeScreen';
import Schedule from './components/Faculty/Schedule';
import Designations from './components/Admin/resources/Designations';
import Courses from './components/Admin/resources/Courses';
import AssignedCourses from './components/Admin/resources/AssignedCourses';
import InstituteSchedule from './components/Admin/InstituteSchedule'
import AuthRoute from './components/Root/AuthRoute'
import AdminProfile from './components/Admin/AdminProfile'
import FacultyProfile from './components/Faculty/FacultyProfile'
import FacultyConstraints from './components/Faculty/FacultyConstraints';
import OfferedCourses from './components/Admin/resources/OfferedCourses';
import AllocatedTeacher from './components/Admin/resources/AllocatedTeacher';
 
Modal.setAppElement('#root')
function App() {

  // from new branch

  const isAdmin = localStorage.getItem('is_admin');
  
  return (
    <div>
      <Provider store={store}>
        <Routes>

        <Route exact path='/FYP_Frontend_ARA' element={<LandingPage />} />

        {isAdmin === 'false' ? <Route path='*' element={<NoMatch />}/> : <Route path='/admin' element={<AuthRoute><AdminHomeScreen /></AuthRoute>} />}
        {isAdmin === 'false' ? <Route path='*' element={<NoMatch />}/> : <Route path='/domains' element={<AuthRoute><Domains /></AuthRoute>} /> }
        {isAdmin === 'false' ? <Route path='*' element={<NoMatch />}/> : <Route path='/instituteSchedule' element={<AuthRoute><InstituteSchedule/></AuthRoute>}/>}
        {isAdmin === 'false' ? <Route path='*' element={<NoMatch />}/> : <Route path='/departments' element={<AuthRoute><Departments /></AuthRoute>} />}
        {isAdmin === 'false' ? <Route path='*' element={<NoMatch />}/> : <Route path='/batches' element={<AuthRoute><Batches /></AuthRoute>} />}
        {isAdmin === 'false' ? <Route path='*' element={<NoMatch />}/> : <Route path='/rooms' element={<AuthRoute><Rooms /></AuthRoute>} /> }
        {isAdmin === 'false' ? <Route path='*' element={<NoMatch />}/> : <Route path='/objects' element={<AuthRoute><Objects /></AuthRoute>} />}
        {isAdmin === 'false' ? <Route path='*' element={<NoMatch />}/> : <Route path='/designations' element={<AuthRoute><Designations/></AuthRoute>} />}
        {isAdmin === 'false' ? <Route path='*' element={<NoMatch />}/> : <Route path='/courses' element={<AuthRoute><Courses/></AuthRoute>} />}
        {isAdmin === 'false' ? <Route path='*' element={<NoMatch />}/> : <Route path='/faculty' element={<AuthRoute><Faculty /></AuthRoute>} />}
        {isAdmin === 'false' ? <Route path='*' element={<NoMatch />}/> : <Route path='/assignedCourses' element={<AuthRoute><AssignedCourses/></AuthRoute>}/>}
        {isAdmin === 'false' ? <Route path='*' element={<NoMatch />}/> : <Route path='/adminProfile' element={<AuthRoute><AdminProfile/></AuthRoute>}/>}
        {isAdmin === 'false' ? <Route path='*' element={<NoMatch />}/> : <Route path='/offeredCourses' element={<AuthRoute><OfferedCourses/></AuthRoute>}/>}
        {isAdmin === 'false' ? <Route path='*' element={<NoMatch />}/> : <Route path='/allocatedTeachers' element={<AuthRoute><AllocatedTeacher/></AuthRoute>}/>}

        {isAdmin === 'true' ? <Route path='*' element={<NoMatch />}/> : <Route path='/faculty-home' element={<AuthRoute><FacultyHomeScreen /></AuthRoute>}/>}
        {isAdmin === 'true' ? <Route path='*' element={<NoMatch />}/> : <Route path='/schedule' element={<AuthRoute><Schedule /></AuthRoute>} />}
        {isAdmin === 'true' ? <Route path='*' element={<NoMatch />}/> : <Route path='/facultyProfile' element={<AuthRoute><FacultyProfile /></AuthRoute>} />}
        {isAdmin === 'true' ? <Route path='*' element={<NoMatch />}/> : <Route path='/constraints' element={<AuthRoute><FacultyConstraints /></AuthRoute>} />}

        <Route path='*' element={<NoMatch />} />

        </Routes>
      </Provider>
    </div>
  );
}

export default App;