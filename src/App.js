import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Modal from 'react-modal'
import NoMatch from './components/NoMatch';
import Domains from './components/Domains';
import AdminHomeScreen from './components/Admin/AdminHomeScreen';
import Departments from './components/Admin/resources/Departments';
import Batches from './components/Admin/resources/Batches';
import Objects from './components/Admin/resources/Objects';
import Rooms from './components/Admin/resources/Rooms';

Modal.setAppElement('#root')
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/admin' element={<AdminHomeScreen />} />
        <Route path='/departments' element={<Departments />} />
        <Route path='/batches' element={<Batches />} />
        <Route path='/objects' element={<Objects />} />
        <Route path='/rooms' element={<Rooms />} />
        <Route path='/domains' element={<Domains />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
