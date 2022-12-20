import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Modal from 'react-modal'
import NoMatch from './components/NoMatch';
import Domains from './components/Domains';
import AdminHomeScreen from './components/Admin/AdminHomeScreen';
import AdminResourcesScreen from './components/Admin/AdminResourcesScreen';

Modal.setAppElement('#root')
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/admin-home' element={<AdminHomeScreen />} />
        <Route path='/admin-resources' element={<AdminResourcesScreen />} />
        <Route path='/domains' element={<Domains />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
