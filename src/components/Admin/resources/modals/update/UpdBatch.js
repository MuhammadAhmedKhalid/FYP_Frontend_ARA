import React,{ useEffect, useState } from 'react'
import Modal from 'react-modal'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import GroupsIcon from '@mui/icons-material/Groups';
import CodeIcon from '@mui/icons-material/Code';
import TagIcon from '@mui/icons-material/Tag';
import { useSelector, useDispatch } from 'react-redux'
import { updateBatch } from '../../../../../redux/UpdateBatch/updateBatchActions'
import { getBatchesRequest } from '../../../../../redux/GetBatches/getBatchesActions'
import { getDepartmentsRequest } from '../../../../../redux/GetDepartments/getDepartmentsActions'
import WorkspacesIcon from '@mui/icons-material/Workspaces';

function UpdBatch({update, setUpdate, data}) {

    const dispatch = useDispatch()

    const batches = useSelector((state) => state.getBatchesReducer.batches.data)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)

    const institute_id = Number(localStorage.getItem('institute_id'))

    const [batch, setBatch] = useState({
        batchYear: data[1],
        batchCode: data[3],
        numOfStudents: data[5],
        section: data[4],
        department_id: data[2],
        institute_id,
    })

    useEffect(() => {
        if(institute_id > 0){
            dispatch(getBatchesRequest(institute_id))
            dispatch(getDepartmentsRequest(institute_id))
        }
    }, [institute_id])

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

    const handleDepartmentChange = (e) => {
        const department_name = e.target.value
        for (let i = 0; i < departments.length; i++) {
            if (departments[i].department_name === department_name) {
                setBatch({ ...batch, department_id: departments[i].department_id })
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        for(let i of batches){
            if(i.batchId === data[0]){
                dispatch(updateBatch(i.batchId, batch))
            }
        }

        setUpdate(false)
    }

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={update}
                onRequestClose={() => setUpdate(false)}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Update Batch</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField required autoFocus style={{ margin: '3px' }} size='small' variant="outlined" type='number' 
                            placeholder='Batch year' value={batch.batchYear}
                            onChange={(e) => setBatch({ ...batch, batchYear: e.target.value })}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <GroupsIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                        }} />
                        <TextField required style={{ margin: '3px' }} size='small' variant="outlined" type='text' 
                            placeholder='Batch code' value={batch.batchCode}
                            onChange={(e) => setBatch({ ...batch, batchCode: e.target.value })}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <CodeIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                        }} />
                        <TextField required style={{ margin: '3px' }} size='small' variant="outlined" type='number' 
                            placeholder='Number of students' value={batch.numOfStudents}
                            onChange={(e) => setBatch({ ...batch, numOfStudents: e.target.value })}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <TagIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                        }} />
                        <TextField required style={{ margin: '3px' }} size='small' variant="outlined" type='text' 
                            placeholder='Section' value={batch.section}
                            onChange={(e) => setBatch({ ...batch, section: e.target.value })}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <WorkspacesIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                        }} />
                        <div style={{ margin: '3px' }} className='flexbox-container-y'>
                            <h3 style={{
                                fontWeight: 'normal', color: 'gray', marginRight: '3px'
                            }}>Department</h3>
                            <select required className='dropdown' onChange={handleDepartmentChange}>
                                <option></option>
                                {
                                    departmentsAdded && departments.length !== 0 ? departments.map(department => 
                                        <option key={department.department_id}>{department.department_name}</option>) : null
                                }
                            </select>
                        </div>
                        <center><button className='modal-btn' style={{marginTop: '20px'}} type='submit'>Update</button></center>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default UpdBatch