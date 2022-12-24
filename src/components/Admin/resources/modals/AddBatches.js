import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import GroupsIcon from '@mui/icons-material/Groups';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import axios from 'axios';

function AddBatches(props) {

    const { openBatchModal, setOpenBatchModal } = props

    const [departments, setDepartments] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8080/departments')
            .then((response) => { setDepartments(response.data) })
            .catch((error) => { console.log(error) })
    }, [])

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
        setOpenBatchModal(false)
    }

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={openBatchModal}
                onRequestClose={() => setOpenBatchModal(false)}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Add Batch</h2>
                    <form>
                        <TextField style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Batch No.' InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <GroupsIcon style={{ height: '20px' }} color="action" />
                                </InputAdornment>
                            )
                        }} />
                        <div style={{ margin: '3px' }} className='flexbox-container-y'>
                            <h3 style={{
                                fontWeight: 'normal', color: 'gray', marginRight: '3px'
                            }}>Your Department</h3>
                            <select className='dropdown'>
                                {
                                    departments.map(department => <option key={department.department_id}>{department.department_name}</option>)
                                }
                            </select>
                        </div>
                        <TextField style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Batch Type' InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <FormatListBulletedIcon style={{ height: '20px' }} color="action" />
                                </InputAdornment>
                            )
                        }} />
                    </form>
                    <button className='modal-btn' onClick={closeModal}>Add</button>
                </div>

            </Modal>
        </div>
    )
}

export default AddBatches