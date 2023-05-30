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
    const [deptName, setDeptName] = useState('')
    const [updExperience, setUpdExperience] = useState('')
    const [updSpecializedCourses, setUpdSpecializedCourses] = useState([])

    const facultyList = useSelector((state) => state.getFaculty.faculty)
    const facultyAdded = useSelector((state) => state.getFaculty.added)
    const institute_id = Number(localStorage.getItem('institute_id'))
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
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
            const faculty = {
                name: updName,
                phone_number: updNumber, 
                designation: updDesignation,
                department_id: 0,
                yearsOfExperience: Number(updExperience),
                specialization: updSpecializedCourses
            }
            for(let i of facultyList){
                if(i.officialEmailAddress === oldVal[2]){
                    for(let j of departments){
                        if(j.department_name == deptName){
                            faculty.department_id = j.department_id
                        }
                    }
                    dispatch(updateFaculty(i.faculty_id, JSON.stringify(faculty)))
                }
            }
            setUpdDesignation('')
            setUpdName('')
            setUpdNumber('')
            setDeptName('')
            setUpdSpecializedCourses([])
            setUpdExperience('')
            setOldVal(null)
            setUpdate(false)
        }
    }, [update])

    useEffect(() => {
        if(institute_id>0){
            dispatch(getFacultyRequest(institute_id))
            dispatch(getDepartmentsRequest(institute_id))
        }
    }, [institute_id, refresh])

    useEffect(()=>{
        if(refresh){
            setRowData([])
        }
        if(facultyAdded && departmentsAdded && rowData.length === 0){
            if(refresh){
                setRowData([])
                setRefresh(false)
            }
            for(let i=0; i<facultyList.length; i++){
                for(let j of departments){
                    if(j.department_id == facultyList[i].department_id){
                        rowData.push([facultyList[i].faculty_id, facultyList[i].name, facultyList[i].phone_number, facultyList[i].officialEmailAddress, j.department_name, 
                            facultyList[i].specialization.join(', '), facultyList[i].designation, facultyList[i].yearsOfExperience])
                    }
                }
            }
        }
    }, [facultyList, refresh, departments])
    
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
                            facultyAdded&& <Table columns={['No.', 'Name', 'Phone Number', 'E-mail', 'Department', 'Specialized Courses', 
                            'Designation', 'Years of Experience']} rows={rowData} refresh={refresh} setRefresh={setRefresh} multiEdit={true}
                            isFaculty={true} setUpdate={setUpdate} setOldVal={setOldVal} setDeleteId={setDeleteId}
                            updDesignation={updDesignation} setUpdDesignation={setUpdDesignation}
                            updName={updName} setUpdName={setUpdName}
                            updNumber={updNumber} setUpdNumber={setUpdNumber}
                            deptName={deptName} setDeptName={setDeptName}
                            updExperience={updExperience} setUpdExperience={setUpdExperience}
                            updSpecializedCourses={updSpecializedCourses} setUpdSpecializedCourses={setUpdSpecializedCourses}/>
                        }
                    </div>
                </center>
                <div>
                    <AddFaculty openFacultyModal={openFacultyModal} setOpenFacultyModal={setOpenFacultyModal} setRefresh={setRefresh}/>
                </div>
            </div>
        </div>
    )
}

export default Faculty