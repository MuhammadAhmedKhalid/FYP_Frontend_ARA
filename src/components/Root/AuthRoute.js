import { isAuthenticated } from './auth';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
    const authed = isAuthenticated()
    if(authed)
        return children ;
    return  <Navigate to={"/"} />;
  };



export default AuthRoute