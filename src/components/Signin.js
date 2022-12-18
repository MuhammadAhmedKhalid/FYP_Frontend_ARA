import React, { useState } from 'react'
import Modal from 'react-modal'
import './FormStyles.css'
// import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai'
// import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom';
import Signup from './Signup';
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';

function Signin(props) {

    const { openSignInModal, setOpenSignInModal } = props

    const [openSignUpModal, setOpenSignUpModal] = useState(false)

    const openModal = () => {
        setOpenSignInModal(false)
        setOpenSignUpModal(true)
    }

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

    return (
        <div>
            <div>
                <Modal
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
                        <form >
                            <TextField variant="outlined" type='email' placeholder='Your Email' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <EmailOutlinedIcon color="action" />
                                    </InputAdornment>
                                )
                            }} />
                            <TextField variant="outlined" type='password' placeholder='Password' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <HttpsOutlinedIcon color="action" />
                                    </InputAdornment>
                                )
                            }} />
                            <center>
                                <button style={{ marginTop: 16 }}>Login</button>
                                <p style={{ color: "#115868", fontSize: 16, fontWeight: 700, margin: 16 }}>Forgot Password?</p>
                                <div className='flexbox-container'>
                                    <p style={{ color: '#9098B1', fontSize: 16, fontWeight: 700 }}>Don't have an account?&nbsp;</p>
                                    <Link onClick={openModal}><p style={{ color: '#115868', fontSize: 16, fontWeight: 700, textDecorationLine: 'underline' }}>Sign Up</p></Link>
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