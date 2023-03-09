import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
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
import { getInstitutesRequest } from '../../redux/GetInstitutes/getInstitutesActions'
import { resetIdRequest } from '../../redux/Login/loginActions'
import { format } from 'date-fns';

function AdminQuestionnaire(props) {

    const { openQuestionnaireModal, setOpenQuestionnaireModal, instituteTypeId } = props

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const instituteAdded = useSelector((state) => state.institute.added)
    const institute_id = useSelector((state) => state.institute.institute.institute_id)
    const institute_name = useSelector((state) => state.institute.institute.institute_name)
    const admin_id = useSelector((state) => state.login.user.user_id)

    useEffect(() => {
        if (instituteAdded) {
            dispatch(resetIdRequest(institute_id, institute_name))
            dispatch(getInstitutesRequest())
            navigate('/admin')
        }
    }, [instituteAdded])

    const [date, setDate] = useState(new Date());

    const handleChange = (date) => {
        setDate(date);
    };

    const monthNames = Array.from({ length: 12 }, (_, index) => {
        const date = new Date();
        date.setMonth(index);
        return date.toLocaleString('default', { month: 'long' });
    });

  const selectedMonth = monthNames[date.getMonth()];

    const [institute, setInstitute] = useState({
        institute_type_id: 0,
        institute_name: "",
        branch: "",
        address: "",
        contact: "",
        user_id: admin_id,
        fallStartMonth: format(new Date(), 'MMMM'),
        fallEndMonth: format(new Date(), 'MMMM'),
        springStartMonth: format(new Date(), 'MMMM'),
        springEndMonth: format(new Date(), 'MMMM'),
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

    const handleSave = (e) => {
        e.preventDefault();
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
                    <form onSubmit={handleSave}>
                        <div className='flexbox-container-y'>
                            <TextField
                            autoFocus
                            required
                                value={institute.institute_name}
                                onChange={(e) => setInstitute({ ...institute, institute_type_id: instituteTypeId, institute_name: e.target.value })}
                                style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Your Institute'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <AccountBalanceIcon style={{ height: '20px' }} color="action" />
                                        </InputAdornment>
                                    )
                                }} />
                            <TextField required value={institute.branch} onChange={(e) => setInstitute({ ...institute, branch: e.target.value })} 
                            style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Your Branch' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <LanIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                            <TextField required value={institute.address} onChange={(e) => setInstitute({ ...institute, address: e.target.value })} 
                            style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Your Address' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <LocationOnIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                            <TextField required value={institute.contact} onChange={(e) => setInstitute({ ...institute, contact: e.target.value })} 
                            style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Your Contact' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <CallIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                            <h3 style={{fontWeight: 'normal', color: 'gray', marginRight: '3px'}}>
                                Spring semester starting month:
                            </h3>
                            <select required className='dropdown' onChange={(e) => setInstitute({ ...institute, springStartMonth: e.target.value })}>
                                value={selectedMonth}
                                <option></option>
                                {
                                    monthNames.map((month, index) => (
                                    <option key={index} value={month}>{month}</option>))
                                }
                            </select>
                            <h3 style={{fontWeight: 'normal', color: 'gray', marginRight: '3px'}}>
                                Spring semester ending month:
                            </h3>
                            <select required className='dropdown' onChange={(e) => setInstitute({ ...institute, springEndMonth: e.target.value })}>
                                value={selectedMonth}
                                <option></option>
                                {
                                    monthNames.map((month, index) => (
                                    <option key={index} value={month}>{month}</option>))
                                }
                            </select>
                            <h3 style={{fontWeight: 'normal', color: 'gray', marginRight: '3px'}}>
                                Fall semester starting month:
                            </h3>
                            <select required className='dropdown' onChange={(e) => setInstitute({ ...institute, fallStartMonth: e.target.value })}>
                                value={selectedMonth}
                                <option></option>
                                {
                                    monthNames.map((month, index) => (
                                    <option key={index} value={month}>{month}</option>))
                                }
                            </select>
                            <h3 style={{fontWeight: 'normal', color: 'gray', marginRight: '3px'}}>
                                Fall semester ending month:
                            </h3>
                            <select required className='dropdown' onChange={(e) => setInstitute({ ...institute, fallEndMonth: e.target.value })}>
                                value={selectedMonth}
                                <option></option>
                                {
                                    monthNames.map((month, index) => (
                                    <option key={index} value={month}>{month}</option>))
                                }
                            </select>
                        </div>
                        <center><button style={{marginTop: '20px'}} type='submit' className='modal-btn'>Save</button></center>
                    </form>
                    
                </div>
            </Modal >
        </div >
    )
}

export default AdminQuestionnaire