import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router-dom';
import "../Styling/FormStyles.css"
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LanIcon from '@mui/icons-material/Lan';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';

function AdminQuestionnaire(props) {

    const { openQuestionnaireModal, setOpenQuestionnaireModal } = props
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
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={openQuestionnaireModal}
                onRequestClose={() => setOpenQuestionnaireModal(false)}>
                <div
                    className='flexbox-container-y'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Questionnaire</h2>
                    <form>
                        <div className='flexbox-container-y'>
                            <TextField style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Your Institute' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <AccountBalanceIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                            <TextField style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Your Branch' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <LanIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                            <TextField style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Your Address' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <LocationOnIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                            <TextField style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Your Contact' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <CallIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                            < TextField style={{ margin: '3px' }} size='small' variant="outlined" type='file' label="Your logo" InputLabelProps={{ shrink: true }} />
                        </div>
                    </form>
                    <Link to='/admin'><button className='modal-btn'>Save</button></Link>
                </div>
            </Modal >
        </div >
    )
}

export default AdminQuestionnaire