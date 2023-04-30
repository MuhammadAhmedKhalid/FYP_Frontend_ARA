import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router-dom';
import Signup from './Signup';
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { loginRequest } from '../../redux/Login/loginActions'
import { getInstitutesRequest } from '../../redux/GetInstitutes/getInstitutesActions'
import { Alert } from '@mui/material';

function Signin(props) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn)
    const user_id = Number(localStorage.getItem('user_id'))
    const isAdmin = Boolean(localStorage.getItem('is_admin'))
    const institutes = useSelector((state) => state.getInstitutes.institutes.data)
    const isInstitutesAdded = useSelector((state) => state.getInstitutes.added)
    const [loginErrText, setLoginErrText] = useState('')
    const loginFailed = useSelector((state) => state.login.loginFailed)

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getInstitutesRequest())
        }else if(isLoggedIn === false){
            setLoginErrText('Login failed. Incorrect Email or Password.')
        }
    }, [isLoggedIn])

    useEffect(() => {
        if (isInstitutesAdded) {
            if (institutes.length === 0) {
                navigate('/domains')
            } else {
                for (let i = 0; i < institutes.length; i++) {
                    if (institutes[i].user_id === user_id && isAdmin) {
                        navigate('/admin')
                        break;
                    } else if (isAdmin) {
                        navigate('/faculty-home')
                    }
                    else {
                        navigate('/domains')
                    }
                }
            }
        }
    }, [isInstitutesAdded])

    const { openSignInModal, setOpenSignInModal } = props
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [openSignUpModal, setOpenSignUpModal] = useState(false)

    const [values, setValues] = useState({
        password: "",
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlePasswordChange = (prop) => (event) => {
        setUser({ ...user, password: event.target.value })
        setValues({ ...values, [prop]: event.target.value });
    };

    const openModal = () => {
        setOpenSignInModal(false)
        setOpenSignUpModal(true)
    }

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginRequest(user))
    }
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, .7)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
        },
    };

    return (
        <div>
            <div>
                <Modal
                    className='modal-content'
                    style={customStyles}
                    isOpen={openSignInModal}
                    onRequestClose={() => setOpenSignInModal(false)}>
                    <div
                        className='flexbox-container-y'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <h2 style={{ color: "#115868", fontSize: 20 }}>Welcome To Allocator</h2>
                        <p style={{ color: "#9098B1", fontSize: 14 }}>Sign in to continue</p>
                        <form onSubmit={handleLogin} className='flexbox-container-y'>
                            <TextField autoFocus required value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} 
                            size='small' variant="outlined" type='email' placeholder='Your Email' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <EmailOutlinedIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                            <TextField
                                required
                                size='small'
                                variant="outlined"
                                type={values.showPassword ? "text" : "password"}
                                placeholder='Password'
                                onChange={handlePasswordChange("password")}
                                value={values.password}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <HttpsOutlinedIcon style={{ height: '20px' }} color="action" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}>
                                                {values.showPassword ? <Visibility style={{ height: '20px' }} /> : <VisibilityOff style={{ height: '20px' }} />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }} />
                            <center>
                                <button type='submit' className='modal-btn' style={{ marginTop: 16 }}>Login</button>
                                <p style={{ color: "#115868", fontSize: 12, fontWeight: 700, margin: 16 }}>Forgot Password?</p>
                                <div className='flexbox-container'>
                                    <p style={{ color: '#9098B1', fontSize: 12, fontWeight: 700 }}>Don't have an account?&nbsp;</p>
                                    <Link onClick={openModal}><p style={{ color: '#115868', fontSize: 12, fontWeight: 700, textDecorationLine: 'underline' }}>Sign Up</p></Link>
                                </div>
                                <div>
                                    {
                                        loginFailed && <Alert style={{ marginTop: '12px' }} severity="error">{loginErrText}</Alert>
                                    }
                                </div>
                            </center>
                        </form>
                    </div>
                </Modal>
            </div>
            <div>
                <Signup setOpenSignUpModal={setOpenSignUpModal} openSignUpModal={openSignUpModal}
                    setOpenSignInModal={setOpenSignInModal} />
            </div>
        </div>
    )
}

export default Signin