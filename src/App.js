import { useEffect } from "react";
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
import { useLocation } from 'react-router-dom';
import AdminProfile from './components/Admin/AdminProfile'
import FacultyProfile from './components/Faculty/FacultyProfile'
 
Modal.setAppElement('#root')
function App() {
  const location = useLocation();
  const path = location.pathname;
  const isAdmin = localStorage.getItem('is_admin');

  useEffect(() => {
    console.log(isAdmin)
  }, [isAdmin])
  
  return (
    <div>
      <Provider store={store}>
        <Routes>

          <Route path='/' element={<LandingPage />} />
          
          {isAdmin === 'true' ? <Route path='/admin' element={<AuthRoute><AdminHomeScreen /></AuthRoute>} />  : <Route path='*' element={<NoMatch />} />}
          {isAdmin === 'true' ? <Route path='/domains' element={<AuthRoute><Domains /></AuthRoute>} /> : <Route path='*' element={<NoMatch />}/>}
          {isAdmin === 'true' ? <Route path='/instituteSchedule' element={<AuthRoute><InstituteSchedule/></AuthRoute>}/> : <Route path='*' element={<NoMatch />}/>}
          {isAdmin === 'true' ? <Route path='/departments' element={<AuthRoute><Departments /></AuthRoute>} /> : <Route path='*' element={<NoMatch />}/>}
          {isAdmin === 'true' ? <Route path='/batches' element={<AuthRoute><Batches /></AuthRoute>} /> : <Route path='*' element={<NoMatch />}/>}
          {isAdmin === 'true' ? <Route path='/rooms' element={<AuthRoute><Rooms /></AuthRoute>} /> : <Route path='*' element={<NoMatch />}/>}
          {isAdmin === 'true' ? <Route path='/objects' element={<AuthRoute><Objects /></AuthRoute>} /> : <Route path='*' element={<NoMatch />}/>}
          {isAdmin === 'true' ? <Route path='/positions' element={<AuthRoute><Positions/></AuthRoute>} /> : <Route path='*' element={<NoMatch />}/>}
          {isAdmin === 'true' ? <Route path='/courses' element={<AuthRoute><Courses/></AuthRoute>} /> : <Route path='*' element={<NoMatch />}/>}
          {isAdmin === 'true' ? <Route path='/faculty' element={<AuthRoute><Faculty /></AuthRoute>} /> : <Route path='*' element={<NoMatch />}/>}
          {isAdmin === 'true' ? <Route path='/assignedCourses' element={<AuthRoute><AssignedCourses/></AuthRoute>}/> : <Route path='*' element={<NoMatch />}/>}
          {isAdmin === 'true' ? <Route path='/adminProfile' element={<AuthRoute><AdminProfile/></AuthRoute>}/> : <Route path='*' element={<NoMatch />}/>}
      
          {isAdmin === 'false' ? <Route path='/faculty-home' element={<AuthRoute><FacultyHomeScreen /></AuthRoute>} /> : <Route path='*' element={<NoMatch />}/>}
          {isAdmin === 'false' ? <Route path='/schedule' element={<AuthRoute><Schedule /></AuthRoute>} /> : <Route path='*' element={<NoMatch />}/>}
          {isAdmin === 'false' ? <Route path='/facultyProfile' element={<AuthRoute><FacultyProfile /></AuthRoute>} /> : <Route path='*' element={<NoMatch />}/>}

          <Route path='*' element={<NoMatch />} />

        </Routes>
      </Provider>
    </div>
  );
}

export default App;
