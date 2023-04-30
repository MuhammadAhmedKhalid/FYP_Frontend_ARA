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
import Positions from './components/Admin/resources/Positions';
import Courses from './components/Admin/resources/Courses';
import AssignedCourses from './components/Admin/resources/AssignedCourses';
import InstituteSchedule from './components/Admin/InstituteSchedule'
import AuthRoute from './components/Root/AuthRoute'

Modal.setAppElement('#root')
function App() {
  return (
    <div>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/admin' element={<AuthRoute><AdminHomeScreen /></AuthRoute>} />
          <Route path='/departments' element={<AuthRoute><Departments /></AuthRoute>} />
          
          
          <Route path='/faculty-home' element={<FacultyHomeScreen />} />
          
          <Route path='/batches' element={<Batches />} />
          <Route path='/objects' element={<Objects />} />
          <Route path='/rooms' element={<Rooms />} />
          <Route path='/domains' element={<Domains />} />
          <Route path='/faculty' element={<Faculty />} />
          <Route path='/schedule' element={<Schedule />} />
          <Route path='/positions' element={<Positions/>} />
          <Route path='/courses' element={<Courses/>} />
          <Route path='/assignedCourses' element={<AssignedCourses/>}/>
          <Route path='/instituteSchedule' element={<InstituteSchedule/>}/>
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
