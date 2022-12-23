import React from 'react'
import Modal from 'react-modal'
import TextField from '@material-ui/core/TextField'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import InputAdornment from '@material-ui/core/InputAdornment'


function AddDepartment(props) {

    const { openDepartmentModal, setOpenDepartmentModal } = props

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
        setOpenDepartmentModal(false)
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
                    <form>
                        <TextField style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Department Name' InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <LocalLibraryIcon style={{ height: '20px' }} color="action" />
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

export default AddDepartment