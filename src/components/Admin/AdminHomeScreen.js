import React, { useEffect, useState } from 'react'
import FullCalendar from '../Root/FullCalendar'
import AdminNavBar from './AdminNavbar'
import Img10 from '../../assets/img10.png'
import '../Styling/HomeScreen.css'
import { useSelector, useDispatch } from 'react-redux'
import { getFacultyRequest } from '../../redux/GetFaculty/getFacultyActions'
import RequestedData from '../Root/RequestedData'
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import { getDepartmentsRequest } from '../../redux/GetDepartments/getDepartmentsActions'
import { getBatchesRequest } from '../../redux/GetBatches/getBatchesActions'
import { getRoomsRequest } from '../../redux/GetRooms/getRoomsActions'

function AdminHomeScreen() {

    const dispatch = useDispatch()

    const faculty = useSelector((state) => state.getFaculty.faculty)
    const facultyAdded = useSelector((state) => state.getFaculty.added)
    const adminName = localStorage.getItem('name')
    const instituteName = localStorage.getItem('institute_name')
    const institute_name = useSelector((state) => state.institute.institute.institute_name)
    const institutes = useSelector((state) => state.getInstitutes.institutes.data)
    const isInstitutesAdded = useSelector((state) => state.getInstitutes.added)
    const admin_id = Number(localStorage.getItem('user_id'))
    const institute_id = localStorage.getItem('institute_id')
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const batches = useSelector((state) => state.getBatchesReducer.batches.data)
    const batchesAdded = useSelector((state) => state.getBatchesReducer.added)
    const rooms = useSelector((state) => state.getRooms.rooms.data)
    const roomsAdded = useSelector((state) => state.getRooms.added)

    const [instituteId, setInstituteId] = useState(0)
    const [greetings, setGreetings] = useState("")
    const [labels, setLabels] = useState([])
    const [facultyNum, setFacultyNum] = useState([])
    const [batchesNum, setBatchesNum] = useState([])
    const [roomsNum, setRoomsNum] = useState([])
    const [backgroundColor, setBackgroundColor] = useState([])
    const [hoverBackgroundColor, setHoverBackgroundColor] = useState([])

    const colorShades = ['#000000', '#333333', '#666666', '#999999', '#cccccc', '#4B0082', '#000080', '#000000', '#8B4513', '#A9A9A9'];

    useEffect(() => {
        if(departmentsAdded && facultyAdded && labels.length !== departments.length && batchesAdded && roomsAdded){
            for(let i of departments){
                labels.push(i.department_name)
                facultyNum.push(0)
                batchesNum.push(0)
                roomsNum.push(0)
                backgroundColor.push(colorShades[Math.floor(Math.random() * colorShades.length)])
                hoverBackgroundColor.push(colorShades[Math.floor(Math.random() * colorShades.length)])
            }
            for(let j of faculty){
                for(let k in labels){
                    for(let l of departments){
                        if(labels[k] === l.department_name && j.department_id === l.department_id){
                            facultyNum[k] += 1
                        }
                    }
                }
            }
            for(let i of batches){
                for(let j in labels){
                    for(let k of departments){
                        if(labels[j] === k.department_name && i.department_id === k.department_id){
                            batchesNum[j] +=1
                        }
                    }
                }
            }
            for(let i of rooms){
                for(let j in labels){
                    for(let k of departments){
                        if(labels[j] === k.department_name && i.department_id === k.department_id){
                            roomsNum[j] +=1
                        }
                    }
                }
            }
        }
    }, [departmentsAdded, facultyAdded, batchesAdded, roomsAdded])

    const facultyData = {
        labels: labels,
        datasets: [
            {
                data: facultyNum,
                backgroundColor: backgroundColor,
                hoverBackgroundColor: hoverBackgroundColor,
            },
        ],
    };
      
    const batchesData = {
        labels: labels,
        datasets: [
            {
                data: batchesNum,
                backgroundColor: backgroundColor,
                hoverBackgroundColor: hoverBackgroundColor,
            },
        ],
    }
    
    const roomsData = {
        labels: labels,
        datasets: [
            {
                data: roomsNum,
                backgroundColor: backgroundColor,
                hoverBackgroundColor: hoverBackgroundColor,
            },
        ],
    };
    
    const options = {
        responsive: true,
        plugins: { egend: { labels: { font: { family: 'Arial', size: 14 }}}},
        elements: { arc: { borderWidth: 1, borderColor: '#FFFFFF' }},
        layout: { padding: { left: 10, right: 10, top: 10, bottom: 10 }}
    };

    useEffect(() => {
        if(institute_id > 0){
            dispatch(getDepartmentsRequest(institute_id))
            dispatch(getBatchesRequest(instituteId))
        }
    }, [institute_id])

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
    }, [instituteId])

    useEffect(() => {
        let date = new Date();
        let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }).split(":")
        const setMessage = () => {
            if (time[0] >= 5 && time[0] <= 11) {
                setGreetings("Morning")
            } else if (time[0] >= 12 && time[0] <= 16) {
                setGreetings("Afternoon")
            } else if (time[0] >= 17 && time[0] <= 20) {
                setGreetings("Evening")
            } else {
                setGreetings("Night")
            }
        }
        setMessage()
    }, [])

    return (
        <div className="flexbox-container-y"
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                height: '100vh',
                background: '#fff'
            }}>
            <div>
                <AdminNavBar />
                <div style={{ marginTop: '60px', padding: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h2 style={{ fontWeight: 'normal' }}>Good {greetings}</h2>
                        <div className='flexbox-container'>
                            <div
                                style={{
                                    display: 'flex',
                                    width: '30.4px',
                                    height: '30.4px',
                                    borderRadius: '50%',
                                    marginRight: '5px'
                                }}>
                                <img src={Img10} alt='Admin' />
                            </div>
                            {
                                <h2 style={{ color: '#0E5E6F' }}>{adminName}</h2>
                            }
                        </div>
                    </div><h1 style={{ color: '#0E5E6F' }}>{instituteName || institute_name}!</h1>
                </div>
                <div className='flexbox-container' style={{ justifyContent: 'space-between' }}>
                <div className="chart-container flexbox-container-y">
                    <Pie type='line' data={facultyData} options={options}/>
                    <p style={{color: 'black', fontSize: '15px'}}>Faculty Meter</p>
                </div>
                <div className="chart-container flexbox-container-y">
                    <Pie type='line' data={batchesData} options={options} />
                    <p style={{color: 'black', fontSize: '15px'}}>Batches Meter</p>
                </div>
                <div className="chart-container flexbox-container-y">
                    <Pie type='line' data={roomsData} options={options} />
                    <p style={{color: 'black', fontSize: '15px'}}>Rooms Meter</p>
                </div>
                    <div style={{ justifyContent: 'flex-end' }}>
                        <FullCalendar
                            messages={{ next: '>', previous: '<', today: 'Current' }}
                            views={['month']}
                            style={{ height: 280, width: 450, padding: '15px' }}
                        />
                    </div>
                </div>
                <RequestedData/>
            </div>
        </div>
    )
}

export default AdminHomeScreen