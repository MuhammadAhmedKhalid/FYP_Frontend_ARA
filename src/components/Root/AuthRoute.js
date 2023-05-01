import { Navigate } from 'react-router-dom';
import '../Styling/TableStyles.css'

function AuthRoute({ children }){

  const token = localStorage.getItem('token');
  
  if(token){
    return children
  }else{
    return <Navigate to={"/"} />
  }

}

export default AuthRoute