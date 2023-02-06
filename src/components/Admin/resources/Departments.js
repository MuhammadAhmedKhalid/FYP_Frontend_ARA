import React, { useState, useEffect } from 'react'
import AdminNavBar from '../AdminNavbar'
import AdminIcon from '../AdminIcon'
import AddDepartment from './modals/AddDepartment'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../redux/GetDepartments/getDepartmentsActions'
import './Table.css';

function Departments() {

    const dispatch = useDispatch()

    const [openDepartmentModal, setOpenDepartmentModal] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const institute_name = useSelector((state) => state.login.user.institute_name)

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
                    <div style={{ marginTop: '30px' }} className='center'>
                        <button className='modal-btn-w' onClick={openModal}>ADD DEPARTMENT</button>
                    </div>
                    <div style={{ marginTop: '30px' }} className='center'>
                        <h2 style={{ color: '#0E5E6F' }}>DEPARTMENTS LIST</h2>
                    </div>
                    <center>
                        <div className="table-container" style={{ marginTop: '30px' }}>
                        <table className="table">
                            <thead className="fixed-header">
                            <tr>
                                <th>No.</th>
                                <th>Department</th>
                                <th>Institute</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                departmentsAdded && departments.length !== 0 ?
                                departments.map((department, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{department.department_name}</td>
                                        <td>{institute_name}</td>
                                    </tr>
                                )) : null
                            }
                            </tbody>
                        </table>
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