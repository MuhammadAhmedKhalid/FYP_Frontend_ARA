import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router-dom';
import "../Styling/FormStyles.css"
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LanIcon from '@mui/icons-material/Lan';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { addInstituteRequest } from '../../redux/AddInstitute/instituteActions'

function AdminQuestionnaire(props) {

    const { openQuestionnaireModal, setOpenQuestionnaireModal, instituteTypeId } = props

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const instituteAdded = useSelector((state) => state.institute.added)
    const admin_id = useSelector((state) => state.login.user.user_id)

    useEffect(() => {
        if (instituteAdded) {
            /////////////////////////////////////
            navigate('/admin')
        }
    }, [instituteAdded])

    const [institute, setInstitute] = useState({
        institute_type_id: 0,
        institute_name: "",
        branch: "",
        address: "",
        contact: "",
        user_id: admin_id
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

    const handleSave = () => {
        dispatch(addInstituteRequest(institute))
    }

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
                            <TextField value={institute.institute_name} onChange={(e) => setInstitute({ ...institute, institute_type_id: instituteTypeId, institute_name: e.target.value })} style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Your Institute' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <AccountBalanceIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                            <TextField value={institute.branch} onChange={(e) => setInstitute({ ...institute, branch: e.target.value })} style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Your Branch' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <LanIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                            <TextField value={institute.address} onChange={(e) => setInstitute({ ...institute, address: e.target.value })} style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Your Address' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <LocationOnIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                            <TextField value={institute.contact} onChange={(e) => setInstitute({ ...institute, contact: e.target.value })} style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Your Contact' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <CallIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                        </div>
                    </form>
                    <Link onClick={handleSave}><button className='modal-btn'>Save</button></Link>
                </div>
            </Modal >
        </div >
    )
}

export default AdminQuestionnaire