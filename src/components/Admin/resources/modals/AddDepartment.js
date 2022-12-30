import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import TextField from '@material-ui/core/TextField'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import InputAdornment from '@material-ui/core/InputAdornment'
import axios from 'axios'

function AddDepartment(props) {

    const { openDepartmentModal, setOpenDepartmentModal, setRefresh } = props

    useEffect(() => {
        setRefresh(false)
    })

    const [department, setDepartment] = useState({
        department_id: "",
        department_name: "",
        institue_id: ""
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

        setOpenDepartmentModal(false)
        axios.post('http://localhost:8080/add_department', department)
            .then((response) => { console.log(response) })
            .catch((error) => { console.log(error) })
        setRefresh(true)
    }
    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={openDepartmentModal}
                onRequestClose={() => setOpenDepartmentModal(false)}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Add Department</h2>
                    <form onSubmit={submitHandler}>
                        <label>Enter department id</label>
                        <input type='text' value={department.department_id} onChange={(e) => setDepartment({ ...department, department_id: e.target.value })} />
                        <TextField value={department.department_name} onChange={(e) => setDepartment({ ...department, department_name: e.target.value })}
                            style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Department Name' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <LocalLibraryIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                        <label>Enter institute id</label>
                        <input type='text' value={department.institue_id} onChange={(e) => setDepartment({ ...department, institue_id: e.target.value })} />
                        <div className='center flexbox-container-y'>
                            <button style={{ marginTop: '1rem' }} type='submit' className='modal-btn'>Add</button>
                        </div>
                    </form>

                </div>

            </Modal>
        </div>
    )
}

export default AddDepartment