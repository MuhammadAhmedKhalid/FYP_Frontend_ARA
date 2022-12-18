import { Route, Routes } from 'react-router-dom';
import LandingPage from './routes/LandingPage';
import Modal from 'react-modal'
import NoMatch from './components/NoMatch';

Modal.setAppElement('#root')
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
