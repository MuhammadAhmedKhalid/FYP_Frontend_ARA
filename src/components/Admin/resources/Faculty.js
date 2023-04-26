import React, { useState, useEffect } from 'react'
import AdminNavBar from '../AdminNavbar'
import AdminIcon from '../AdminIcon'
import AddFaculty from './modals/AddFaculty'
import { getFacultyRequest } from '../../../redux/GetFaculty/getFacultyActions'
import { useSelector, useDispatch } from 'react-redux'
import Table from '../../Root/Table'

function Faculty() {

    const [openFacultyModal, setOpenFacultyModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [rowData, setRowData] = useState([])

    const dispatch = useDispatch()

    const faculty = useSelector((state) => state.getFaculty.faculty)
    const facultyAdded = useSelector((state) => state.getFaculty.added)
    const institutes = useSelector((state) => state.getInstitutes.institutes.data)
    const isInstitutesAdded = useSelector((state) => state.getInstitutes.added)
    const admin_id = useSelector((state) => state.login.user.user_id)
    const institute_id = useSelector((state) => state.login.user.institute_id)

    useEffect(() => {
        if(institute_id>0){
            if(refresh){
                setRowData([])
            }
            dispatch(getFacultyRequest(institute_id))
        }
    }, [institute_id, refresh])

    useEffect(()=>{
        if(facultyAdded && rowData.length === 0){
            for(let i=0; i<faculty.length; i++){
                rowData.push([faculty[i].name, faculty[i].phone_number, faculty[i].officialEmailAddress, faculty[i].department, 
                    faculty[i].specialization.join(', '), faculty[i].designation, faculty[i].yearsOfExperience])
            }
        }
    }, [facultyAdded, refresh])
    
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
                    <h2 style={{ color: '#0E5E6F' }}>FACULTY</h2>
                </div>
                <center>
                    <div>
                        {
                            facultyAdded&& <Table columns={['No.', 'Name', 'Phone Number', 'E-mail', 'Department', 'Specialization', 
                            'Designation', 'Years of Experience']} rows={rowData} refresh={refresh} setRefresh={setRefresh} multiEdit={true}/>
                        }
                    </div>
                </center>
                <div>
                    <AddFaculty openFacultyModal={openFacultyModal} setOpenFacultyModal={setOpenFacultyModal}/>
                </div>
            </div>
        </div>
    )
}

export default Faculty