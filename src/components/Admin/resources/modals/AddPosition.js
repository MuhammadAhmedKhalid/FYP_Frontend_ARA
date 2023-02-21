import React, { useState } from 'react'
import Modal from 'react-modal'
import TextField from '@material-ui/core/TextField'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import InputAdornment from '@material-ui/core/InputAdornment'
import { useSelector } from 'react-redux'

function AddPosition(props) {

    const { openPositionModal, setOpenPositionModal, setRefresh } = props

    const institute_id = useSelector((state) => state.login.user.institute_id)

    const [position, setPosition] = useState({
        position_name: " ",
        institute_id
    })

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

    const submitHandler = (event) => {
        event.preventDefault()
        setOpenPositionModal(false)
        setRefresh(true)
        console.log(position)
    }

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={openPositionModal}
                onRequestClose={() => setOpenPositionModal(false)}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Add Position</h2>
                    <form onSubmit={submitHandler}>
                    <TextField required autoFocus value={position.position_name} onChange={(e) => setPosition({ ...position, position_name: e.target.value })}
                            style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Position Name' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <MilitaryTechIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                        <div className='center flexbox-container-y'>
                            <button style={{ marginTop: '1rem' }} type='submit' className='modal-btn'>Add</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default AddPosition