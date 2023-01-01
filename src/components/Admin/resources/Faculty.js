import React, { useState, useEffect } from 'react'
import AdminNavBar from '../AdminNavbar'
import AdminIcon from '../AdminIcon'
import AddFaculty from './modals/AddFaculty'
import { getFacultyRequest } from '../../../redux/GetFaculty/getFacultyActions'
import { useSelector, useDispatch } from 'react-redux'

function Faculty() {

    const [openFacultyModal, setOpenFacultyModal] = useState(false)
    const [instituteId, setInstituteId] = useState(0)
    const [refresh, setRefresh] = useState(false)

    const dispatch = useDispatch()

    const faculty = useSelector((state) => state.getFaculty.faculty)
    const institutes = useSelector((state) => state.getInstitutes.institutes.data)
    const isInstitutesAdded = useSelector((state) => state.getInstitutes.added)
    const admin_id = useSelector((state) => state.login.user.user_id)

    useEffect(() => {
        if (isInstitutesAdded && institutes.length !== 0) {
            for (let i = 0; i < institutes.length; i++) {
                if (institutes[i].user_id === admin_id) {
                    setInstituteId(institutes[i].institute_id)
                }
            }
        }
    }, [isInstitutesAdded])

    useEffect(() => {
        dispatch(getFacultyRequest(instituteId))
    }, [instituteId, refresh])

    const openModal = () => {
        setOpenFacultyModal(true)
    }

    return (
        <div className="flexbox-container-y white-bg-y">
            <div>
                <AdminNavBar />
                <AdminIcon />
                <div style={{ marginTop: '25px' }} className='center'>
                    <button className='modal-btn-w' onClick={openModal}>ADD FACULTY</button>
                </div>
                <div style={{ marginTop: '25px' }} className='center'>
                    <h2 style={{ color: '#0E5E6F' }}>FACULTY LIST</h2>
                </div>
                <center>
                    <div>
                        {
                            faculty.map(faculty => (<h5 key={faculty.faculty_id}>{faculty.name} {faculty.phone_number} {faculty.department} {faculty.specialization}</h5>))
                        }
                    </div>
                </center>
                <div>
                    <AddFaculty openFacultyModal={openFacultyModal} setOpenFacultyModal={setOpenFacultyModal} setRefresh={setRefresh} />
                </div>
            </div>
        </div>
    )
}

export default Faculty