import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function Signup(props) {

    const { openSignUpModal, setOpenSignUpModal, setOpenSignInModal } = props

    const [showPasswordError, setShowPasswordError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

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
        setValues({ ...values, [prop]: event.target.value });
    };

    const [values1, setValues1] = useState({
        password: "",
        showPassword: false,
    });

    const handleClickShowPassword1 = () => {
        setValues1({ ...values1, showPassword: !values1.showPassword });
    };

    const handleMouseDownPassword1 = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (values.password === values1.password) {
            setShowPasswordError(false)
            setErrorMsg("")
        } else {
            setShowPasswordError(true)
            setErrorMsg("Please make sure both passwords match.")
        }
    }, [values1.password, values.password])

    const handlePasswordChange1 = (prop) => (event) => {
        setValues1({ ...values1, [prop]: event.target.value })
    };

    const customStyles = {
        content: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '50px',
            zIndex: 1000
        },
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

    const openModal = () => {
        setOpenSignUpModal(false)
        setOpenSignInModal(true)
    }

    return (
        <div>
            <Modal
                style={customStyles}
                isOpen={openSignUpModal}
                onRequestClose={() => setOpenSignUpModal(false)}>
                <div
                    className='flexbox-container-y'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Welcome To Allocator</h2>
                    <p style={{ color: "#9098B1", fontSize: 14 }}>Sign up to continue</p>
                    <form>
                        <TextField size='small' variant="outlined" type='text' placeholder='Your Name' InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <AccountCircleOutlinedIcon style={{ height: '20px' }} color="action" />
                                </InputAdornment>
                            )
                        }} />
                        <TextField size='small' variant="outlined" type='email' placeholder='Your Email' InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <EmailOutlinedIcon style={{ height: '20px' }} color="action" />
                                </InputAdornment>
                            )
                        }} />
                        <div>
                            <TextField
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
                                }}
                            />
                        </div>
                        <TextField
                            size='small'
                            error={showPasswordError}
                            helperText={errorMsg}
                            variant="outlined"
                            type={values1.showPassword ? "text" : "password"}
                            placeholder='Re-enter Password'
                            onChange={handlePasswordChange1("password")}
                            value={values1.password}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <HttpsOutlinedIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            onClick={handleClickShowPassword1}
                                            onMouseDown={handleMouseDownPassword1}>
                                            {values1.showPassword ? <Visibility style={{ height: '20px' }} /> : <VisibilityOff style={{ height: '20px' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} />
                        <center>
                            <Link to="/domains">
                                <button className='modal-btn' style={{ marginTop: 16 }}>Sign Up</button>
                            </Link>
                            <div className='flexbox-container'>
                                <p style={{ color: '#9098B1', fontSize: 11, fontWeight: 700, marginTop: 16 }}>Already have an account?&nbsp;</p>
                                <Link onClick={openModal}><p style={{ color: '#115868', fontSize: 11, fontWeight: 700, textDecorationLine: 'underline', marginTop: 16 }}>Login</p></Link>
                            </div>
                        </center>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default Signup