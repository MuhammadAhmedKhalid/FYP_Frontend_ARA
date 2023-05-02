import { useEffect, useState } from "react";
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

  // const [isAdmin, setIsAdmin] = useState(null);

  // useEffect(() => {
  //   const isAdminValue = JSON.parse(localStorage.getItem('is_admin'));
  //   setIsAdmin(isAdminValue);
  // }, []);

  // if (isAdmin !== null) {
  //   {(isAdmin || !isAdmin) && (<div className="loading-overlay"><div className="loading-icon"></div></div>)}
  // }
  
  return (
    <div>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          
          {/* {isAdmin ? <Route path='/admin' element={<AuthRoute><AdminHomeScreen /></AuthRoute>} />  : <Route path='*' element={<NoMatch />} />}       */}
          <Route path='/admin' element={<AuthRoute><AdminHomeScreen /></AuthRoute>} />    
          <Route path='/domains' element={<AuthRoute><Domains /></AuthRoute>} />
          <Route path='/instituteSchedule' element={<AuthRoute><InstituteSchedule/></AuthRoute>}/>
          <Route path='/departments' element={<AuthRoute><Departments /></AuthRoute>} />
          <Route path='/batches' element={<AuthRoute><Batches /></AuthRoute>} />
          <Route path='/rooms' element={<AuthRoute><Rooms /></AuthRoute>} />
          <Route path='/objects' element={<AuthRoute><Objects /></AuthRoute>} />
          <Route path='/positions' element={<AuthRoute><Positions/></AuthRoute>} />
          <Route path='/courses' element={<AuthRoute><Courses/></AuthRoute>} />
          <Route path='/faculty' element={<AuthRoute><Faculty /></AuthRoute>} />
          <Route path='/assignedCourses' element={<AuthRoute><AssignedCourses/></AuthRoute>}/>
          
          <Route path='/faculty-home' element={<AuthRoute><FacultyHomeScreen /></AuthRoute>} />
          <Route path='/schedule' element={<AuthRoute><Schedule /></AuthRoute>} />

          <Route path='*' element={<NoMatch />} />

        </Routes>
      </Provider>
    </div>
  );
}

export default App;
