import React, { useState, useEffect } from 'react'
import AdminNavBar from '../AdminNavbar'
import AdminIcon from '../AdminIcon'
import AddFaculty from './modals/AddFaculty'
import { getFacultyRequest } from '../../../redux/GetFaculty/getFacultyActions'
import { useSelector, useDispatch } from 'react-redux'
import Table from '../../Root/Table'
import { getDepartmentsRequest } from '../../../redux/GetDepartments/getDepartmentsActions'
import { updateFaculty, resetState } from '../../../redux/UpdateFaculty/updateFacultyActions'
import { deleteFacultyRequest } from '../../../redux/DeleteFaculty/deleteFacultyActions'

function Faculty() {

    const dispatch = useDispatch()

    const [openFacultyModal, setOpenFacultyModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [rowData, setRowData] = useState([])
    const [updNumber, setUpdNumber] = useState('')
    const [updName, setUpdName] = useState('')
    const [updDesignation, setUpdDesignation] = useState('')
    const [oldVal, setOldVal] = useState(null)
    const [update, setUpdate] = useState(false)
    const [deleteId, setDeleteId] = useState(null)

    const faculty = useSelector((state) => state.getFaculty.faculty)
    const facultyAdded = useSelector((state) => state.getFaculty.added)
    const institute_id = useSelector((state) => state.login.user.institute_id)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const updateError = useSelector((state) => state.updateFacultyReducer.error)
    const updatedSuccessfully = useSelector((state) => state.updateFacultyReducer.updated)

    useEffect(() => {
        if(deleteId !== null){
            dispatch(deleteFacultyRequest(deleteId))
            setUpdate(false)
            setDeleteId(null)
        }
    }, [deleteId])


    useEffect(()=>{
        if(updateError.length > 0){
            alert(updateError)
            dispatch(resetState())
        }else if(updatedSuccessfully){
            alert('Updated successfully.')
            dispatch(resetState())
        }
    }, [updateError, updatedSuccessfully])

    useEffect(() => {
        if(update){
            for(let i of faculty){
                if(i.faculty_id === oldVal[0]){
                    const faculty = {
                        name: updName,
                        phone_number: updNumber, 
                        designation: updDesignation
                    }
                    dispatch(updateFaculty(i.faculty_id, faculty))
                }
            }
            setUpdDesignation('')
            setUpdName('')
            setUpdNumber('')
            setOldVal(null)
            setUpdate(false)
        }
    }, [update])

    useEffect(() => {
        if(institute_id>0){
            if(refresh){
                setRowData([])
            }
            dispatch(getFacultyRequest(institute_id))
            dispatch(getDepartmentsRequest(institute_id))
        }
    }, [institute_id, refresh])

    useEffect(()=>{
        if(facultyAdded && rowData.length === 0){
            for(let i=0; i<faculty.length; i++){
                for(let j of departments){
                    if(j.department_id == faculty[i].department_id){
                        rowData.push([faculty[i].faculty_id, faculty[i].name, faculty[i].phone_number, faculty[i].officialEmailAddress, j.department_name, 
                            faculty[i].specialization.join(', '), faculty[i].designation, faculty[i].yearsOfExperience])
                    }
                }
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
                            'Designation', 'Years of Experience']} rows={rowData} refresh={refresh} setRefresh={setRefresh} multiEdit={true}
                            isFaculty={true} setUpdate={setUpdate} setOldVal={setOldVal} setDeleteId={setDeleteId}
                            updDesignation={updDesignation} setUpdDesignation={setUpdDesignation}
                            updName={updName} setUpdName={setUpdName}
                            updNumber={updNumber} setUpdNumber={setUpdNumber} />
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