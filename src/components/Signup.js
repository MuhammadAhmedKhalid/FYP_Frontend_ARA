import React from 'react'
import Modal from 'react-modal'
import './FormStyles.css'
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import GoogleIcon from '@mui/icons-material/Google';

function Signup(props) {

    const { openSignUpModal, setOpenSignUpModal, setOpenSignInModal } = props

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
                        <TextField variant="outlined" type='text' placeholder='Your Name' InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <AccountCircleOutlinedIcon color="action" />
                                </InputAdornment>
                            )
                        }} />
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
                        <TextField variant="outlined" type='password' placeholder='Re-enter Password' InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <HttpsOutlinedIcon color="action" />
                                </InputAdornment>
                            )
                        }} />
                        <center>
                            <button style={{ marginTop: 16 }}>Sign Up</button>
                            <p style={{ color: '#9098B1', fontSize: 16, fontWeight: 700, marginTop: 16 }}>OR</p>
                            <Button variant="contained" startIcon={<GoogleIcon />} style={{ marginTop: 16, color: '#0E5E6F', border: '1px solid #0E5E6F', background: '#fff', boxDecorationBreak: 'unset' }}>Sign up with Google</Button>
                            <div className='flexbox-container'>
                                <p style={{ color: '#9098B1', fontSize: 16, fontWeight: 700, marginTop: 16 }}>Already have an account?&nbsp;</p>
                                <Link onClick={openModal}><p style={{ color: '#115868', fontSize: 16, fontWeight: 700, textDecorationLine: 'underline', marginTop: 16 }}>Login</p></Link>
                            </div>
                        </center>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default Signup