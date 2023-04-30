import { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { checkTokenRequest } from '../../redux/CheckTokenValidity/checkValidityActions'

const AuthRoute = ({ children }) => {

  const dispatch = useDispatch()
  
  const isValid = useSelector((state) => state.checkTokenReducer.valid)
  console.log(isValid)

  useEffect(() => {
    const token = localStorage.getItem('token');
    dispatch(checkTokenRequest(token))
  }, [])
  
  if(isValid){
    return children
  }else{
    return <Navigate to={"/"} />
  }

}

export default AuthRoute