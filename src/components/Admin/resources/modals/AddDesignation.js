import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import TextField from '@material-ui/core/TextField'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import InputAdornment from '@material-ui/core/InputAdornment'
import { useSelector, useDispatch } from 'react-redux'
import { addPositionRequest, resetState } from '../../../../redux/AddPosition/addPositionActions'
import { Alert } from '@mui/material';

function AddDesignation(props) {

    const { openPositionModal, setOpenPositionModal, setRefresh } = props

    const dispatch = useDispatch()

    const institute_id = Number(localStorage.getItem('institute_id'))
    const requestSuccessfull = useSelector((state) => state.addPositionReducer.added)
    const requestUnsuccessfullMsg = useSelector((state) => state.addPositionReducer.error)

    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')

    const [position, setPosition] = useState({
        position_name: "",
        institute_id
    })

    useEffect(() => {
        if(requestSuccessfull){
            setRefresh(true)
            setOpenPositionModal(false)
            setErrorMsg('')
            setShowError(false)
            alert("Operation performed successfully!")
            dispatch(resetState())
        } else if (requestSuccessfull === false) {
            setErrorMsg(requestUnsuccessfullMsg)
            setShowError(true)
            dispatch(resetState())
        }
    }, [requestSuccessfull])

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

    const closeModal = () => {
        setOpenPositionModal(false)
        setShowError(false)
        setErrorMsg('')
    }

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(addPositionRequest(position))
    }

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={openPositionModal}
                onRequestClose={() => closeModal()}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Add Designation</h2>
                    <form onSubmit={submitHandler}>
                    <TextField required autoFocus value={position.position_name} onChange={(e) => setPosition({ ...position, position_name: e.target.value })}
                            style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Designation Name' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <MilitaryTechIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                        <div>
                            {
                                showError && <Alert style={{ marginTop: '12px' }} severity="error">{errorMsg}</Alert>
                            }
                        </div>
                        <div className='center flexbox-container-y'>
                            <button style={{ marginTop: '1rem' }} type='submit' className='modal-btn'>Add</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default AddDesignation