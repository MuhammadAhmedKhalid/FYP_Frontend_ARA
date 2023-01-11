import React, { useState, useEffect } from 'react'
import AdminNavBar from '../AdminNavbar'
import AdminIcon from '../AdminIcon'
import AddDepartment from './modals/AddDepartment'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../redux/GetDepartments/getDepartmentsActions'

function Departments() {

    const dispatch = useDispatch()

    const [openDepartmentModal, setOpenDepartmentModal] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)

    const openModal = () => {
        setOpenDepartmentModal(true)
    }
    useEffect(() => {
        dispatch(getDepartmentsRequest())
    }, [refresh])

    return (
        <div>
            <div className="flexbox-container-y white-bg-y">
                <div>
                    <AdminNavBar />
                    <AdminIcon />
                    <div style={{ marginTop: '25px' }} className='center'>
                        <button className='modal-btn-w' onClick={openModal}>ADD DEPARTMENT</button>
                    </div>
                    <div style={{ marginTop: '25px' }} className='center'>
                        <h2 style={{ color: '#0E5E6F' }}>DEPARTMENTS LIST</h2>
                    </div>
                    <center>
                        <div>
                            {
                                departmentsAdded && departments.length !== 0 ?
                                    departments.map(department => <div key={department.department_id}>{department.department_id}. {department.department_name}</div>)
                                    : null
                            }
                        </div>
                    </center>
                </div>
            </div>
            <div>
                <AddDepartment openDepartmentModal={openDepartmentModal} setOpenDepartmentModal={setOpenDepartmentModal} setRefresh={setRefresh} />
            </div>
        </div>
    )
}

export default Departments