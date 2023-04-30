import { isAuthenticated } from './auth';
import { useNavigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
    const authed = isAuthenticated()
    const navigate = useNavigate();
    if(authed)
        return children ;
    return  navigate('/');
  };



export default AuthRoute