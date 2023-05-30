import React, { useState, useEffect } from 'react'
import '../Styling/TableStyles.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import TextField from '@material-ui/core/TextField'
import CheckIcon from '@mui/icons-material/Check';
import { useSelector, useDispatch } from 'react-redux'
import { getPositionRequest } from '../../redux/GetPosition/getPositionActions'
import { getDepartmentsRequest } from '../../redux/GetDepartments/getDepartmentsActions'
import { getCourseRequest } from '../../redux/GetCourse/getCourseActions'
import Select from "react-select";

function Table(props) {

    const dispatch = useDispatch()

    const { columns, rows, refresh, setRefresh, uneditable, multiEdit, setUpdate, setOldVal, isFaculty, updVal, setUpdVal,
        updNumber, setUpdNumber, updName, setUpdName, updDesignation, setUpdDesignation, setDeleteId, editDepartments,
        deptName, setDeptName, updExperience, setUpdExperience, updSpecializedCourses, setUpdSpecializedCourses } = props

    let rowData = []

    for(let i of rows){
        const [first, ...rest] = i;
        rowData.push(rest)
    }

    const positions = useSelector((state) => state.getPositionReducer.positions)
    const positionsAdded = useSelector((state) => state.getPositionReducer.added)
    const institute_id = Number(localStorage.getItem('institute_id'))
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const courses = useSelector((state) => state.getCourseReducer.courses)

    useEffect(() => {
        if(institute_id > 0){
            dispatch(getDepartmentsRequest(institute_id))
            dispatch(getCourseRequest(institute_id))
        }
    }, [editDepartments, institute_id])

    useEffect(() => {
        if(institute_id > 0 && multiEdit){
            dispatch(getPositionRequest(institute_id))
        }
    }, [institute_id, multiEdit])

    const [editableRow, setEditableRow] = useState(null);
    const [specializedCourses, setSpecializedCourses] = useState([])

    const handleEdit = (cellData, index) => {
        setEditableRow(index);
        setSpecializedCourses([])
        setOldVal(cellData)
        
        let department_id = 0;
        
        for(let i of departments){
            if(i.department_name === cellData[3]){
                department_id = i.department_id
                break
            }
        }
        
        for(let j of courses){
            if(j.department_id === department_id){
                setSpecializedCourses(specializedCourses => 
                    [...specializedCourses, { label: j.course_name, value: j.course_name }])
            }
        }

    }
    
    const handleInputChange = (text, rowIndex, cellIndex, oldData) => {
        if(!isFaculty){
            setUpdVal(text)
        }else{
            if(cellIndex === 0){
                setUpdName(text)
            } else if(cellIndex === 1){
                setUpdNumber(text)
            } else if(cellIndex === 6){
                setUpdExperience(text)
            } else {
                setUpdDesignation(text)
            }
        }
      };

      const handleDeptChange = (text) => {
        setDeptName(text)
      }

    const handleDelete = (index) => {
        setDeleteId(rows[index][0])
        alert('Deleted successfully.')
        handleRefresh()
    }

    const handleCheck = () => {
        if(
                (!isFaculty && (updVal.length > 0 || deptName.length > 0))  || 
                (isFaculty && (updDesignation.length > 0 || updName.length > 0 || updNumber.length > 0 || deptName.length > 0
                    || updExperience.length > 0 || updSpecializedCourses.length > 0))
            ){
            setEditableRow(null);
            setUpdate(true)
        }
        handleRefresh()
    }

    const handleRefresh = () => {
        setRefresh(true);
        setEditableRow(null);
        setTimeout(() => {
            setRefresh(false);
          }, 1000);
    }

    function handleSelect(data) {
        setUpdSpecializedCourses(data.map(obj => obj.value))
    }

    const isMobile = window.innerWidth <= 1040;

    return (
        <div>
            {/* {refresh && (<div className="loading-overlay"><div className="loading-icon"></div></div>)} */}
            {/* <div className='refreshContainer'><RefreshIcon onClick={handleRefresh} className='refreshButton'/></div> */}
            <div className="table-container" style={{ marginTop: '7px' }}>
                
                <table className="table">
                    <thead className="fixed-header">
                        <tr>
                            {
                                columns.map((column, index) => (<th key={index}>{column}</th>))
                            }
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rowData.map((cellData, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    {
                                        cellData.map((data, dataIndex)=>(
                                            <td key={dataIndex}>
                                                {
                                                    multiEdit === true ?( (editableRow === index) && 
                                                    (dataIndex === 0 || dataIndex === 1 || dataIndex === 3 || dataIndex === 4 || 
                                                        dataIndex === 5 || dataIndex === 6) ? 
                                                    (editableRow === index && (dataIndex === 3 || dataIndex === 5)) ? 
                                                    dataIndex === 5 ? 
                                                    <select className='editableDropdown' 
                                                        onChange={(event) => handleInputChange(event.target.value, index, dataIndex, rows[index])}>
                                                        <option></option>
                                                        {
                                                            positionsAdded && positions.length !== 0 ? positions.map(position =>
                                                                <option key={position.position_id}>{position.position_name}</option>) : null
                                                        }
                                                    </select> : 
                                                    <select className='editableDropdown'
                                                        onChange={(event) => handleDeptChange(event.target.value)}>
                                                        <option></option>
                                                        {
                                                            departmentsAdded && departments.length !== 0 ? departments.map(department =>
                                                                <option key={department.department_id}>{department.department_name}</option>) : null
                                                        }
                                                    </select> 
                                                    :
                                                    dataIndex === 4 ?
                                                    <Select
                                                        options={specializedCourses}
                                                        onChange={handleSelect}
                                                        isSearchable={true}
                                                        isMulti
                                                    /> :
                                                    <TextField value={dataIndex === 0 ? updName : dataIndex === 1 ?
                                                         updNumber : dataIndex === 6 ? updExperience : updDesignation} 
                                                        autoFocus={dataIndex === 0 ? true : false} placeholder={dataIndex === 6 ? String(data) : data} 
                                                        onChange={(event) => handleInputChange(event.target.value, index, dataIndex, rows[index])} 
                                                            size='small' variant="outlined" type={dataIndex === 6 ? 'number' : 'text'}/>: 
                                                            data
                                                            )
                                                        : editableRow === index && dataIndex === 0 ? 
                                                        <TextField autoFocus value={updVal} placeholder={data} 
                                                            onChange={(event) => handleInputChange(event.target.value, index, 1, rows[index])} 
                                                            size='small' variant="outlined" type='text'/>: 
                                                            editDepartments && dataIndex === 1 && editableRow === index ? 
                                                            <select className='editableDropdown'
                                                                onChange={(event) => handleDeptChange(event.target.value)}>
                                                                <option></option>
                                                                {
                                                                    departmentsAdded && departments.length !== 0 ? departments.map(department =>
                                                                        <option key={department.department_id}>{department.department_name}</option>) : null
                                                                }
                                                            </select> : data
                                                }  
                                            </td>
                                        ))
                                    }
                                    <td>
                                    {
                                        isMobile ? null :
                                        <>
                                        <DeleteIcon onClick={() => handleDelete(index)} className='deleteButton'/>
                                        {
                                            editableRow !== null && editableRow === index  ? 
                                                <CheckIcon onClick={handleCheck} className='checkButton' /> : 
                                                uneditable === true ? null : <EditIcon onClick={() => handleEdit(cellData, index)} className='editButton'/>
                                        }
                                        </>
                                    }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table