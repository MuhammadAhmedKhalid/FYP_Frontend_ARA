import React, { useState, useEffect } from 'react'
import { NavLink, Link } from "react-router-dom"
import { FaBars, FaTimes } from 'react-icons/fa';
import "../Styling/NavbarStyles.css"
import CustomDropdown from '../Root/CustomDropdown';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { logoutRequest } from '../.././redux/Login/loginActions'
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { getNotificationsRequest } from '../../redux/GetNotifications/getNotificationsActions'
import { getWeightageRequest } from '../../redux/GetWeightages/getWeightageActions'
import { getFacultyRequest } from '../../redux/GetFaculty/getFacultyActions'
import { getCourseRequest } from '../../redux/GetCourse/getCourseActions' 
import { getBatchesRequest } from '../../redux/GetBatches/getBatchesActions'
import { getDepartmentsRequest } from '../../redux/GetDepartments/getDepartmentsActions'
import CheckIcon from '../Root/CheckIcon';

const logo = {
    fontSize: '20px',
    fontFamily: 'Segoe UI'
}

const AdminNavBar = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    
    const [click, setClick] = useState(false)
    const [color, setColor] = useState(false)
    const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
    const [notificationNum, setNotificationNum] = useState(0)
    const [weightageNotificationDetails, setWeightageNotificationDetails] = useState([])
    const [weightageNotificationsNum, setWeightageNotificationsNum] = useState(0)
    const [refresh, setRefresh] = useState(false)
    
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn)
    const institute_id = localStorage.getItem('institute_id')
    const notifications = useSelector((state) => state.notificationsReqReducer.notifications.data)
    const notificationsAdded = useSelector((state) => state.notificationsReqReducer.added)
    const weightages = useSelector((state) => state.weightageReducer.weightages.data)
    const weightagesAdded = useSelector((state) => state.weightageReducer.added)
    const faculty = useSelector((state) => state.getFaculty.faculty)
    const facultyAdded = useSelector((state) => state.getFaculty.added)
    const courses = useSelector((state) => state.getCourseReducer.courses)
    const coursessAdded = useSelector((state) => state.getCourseReducer.added)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const batches = useSelector((state) => state.getBatchesReducer.batches.data)
    const batchesAdded = useSelector((state) => state.getBatchesReducer.added)

    useEffect(() => {
        if(weightagesAdded && facultyAdded && coursessAdded && departmentsAdded && batchesAdded){  
            let num = 0
            for(let i of weightages){
                if(i.selected !== true){
                    num += 1
                    let facultyDict = {}
                    let courseName;
                    let batchYear;
                    let department;
                    let facultyWeightages = []
                    let date = i.assignedCourse.date
        
                    facultyDict[i.assignedCourse.faculty_id] = "";
                    for(let j of i.jaccardResults){
                        facultyDict[j.faculty_id] = "";
                        facultyWeightages.push(j.jaccardSimilarity)
                    }
    
                    for(let k of courses){
                        if(i.assignedCourse.course_id === k.course_id){
                            courseName = k.course_name
                        }
                    }
                    
                    for(let l of batches){
                        for(let m of departments){
                            if(l.batchId === i.assignedCourse.batchId && i.assignedCourse.department_id === l.department_id
                                && i.assignedCourse.department_id === m.department_id){
                                batchYear = l.batchYear
                                department = m.department_name
                            }
                        }
                    }
        
                    for(let j of faculty){
                        for(let k in facultyDict){
                            if(k == j.faculty_id){
                                facultyDict[k] = j.name
                            }
                        }
                    }
                    
                    const valuesArray = Object.values(facultyDict);
                    const facultyName = valuesArray.shift();
                    const replacingFaculty = valuesArray.slice();
    
                    let replacingFacultyDetails = []
    
                    for(let i in replacingFaculty){
                        for(let j in facultyWeightages){
                           for(let k in facultyDict){
                            if(i === j && facultyDict[k] === replacingFaculty[i]){
                                replacingFacultyDetails.push({id: k, name: replacingFaculty[i], weightage: facultyWeightages[j]})
                            }
                           }
                        }
                    }
    
                    let details = {
                        faculty: facultyName,
                        replacingFacultyDetails,
                        courseName,
                        batchYear, 
                        department,
                        date,
                        assignedCourse: i.assignedCourse,
                        weightageId: i.weightageId
                    }
    
                    weightageNotificationDetails.push(details)
                }
            }
            setWeightageNotificationsNum(num)
        }
    }, [weightagesAdded, refresh])

    useEffect(() => {
        setNotificationNum(0)
        if(notificationsAdded){
            setNotificationNum(notifications.length)
        }
    }, [notificationsAdded, refresh])
    
    useEffect(() => {
        if(institute_id > 0){
            if(refresh){
                setWeightageNotificationDetails([])
            }
            dispatch(getNotificationsRequest(institute_id))
            dispatch(getWeightageRequest(institute_id))
            dispatch(getFacultyRequest(institute_id))
            dispatch(getDepartmentsRequest(institute_id))
            dispatch(getBatchesRequest(institute_id))
            dispatch(getCourseRequest(institute_id))
        }
    }, [institute_id, refresh])

    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         navigate('/')
    //     }
    // }, [isLoggedIn])

    const handleLogout = () => {
        dispatch(logoutRequest)
    }

    const handleClick = () => setClick(!click)
    const changeColor = () => {
        if (window.scrollY >= 100) {
            setColor(true);
        } else {
            setColor(false);
        }
    }

    window.addEventListener("scroll", changeColor);

    function handleNotificationIconClick() {
        setIsNotificationPanelOpen(!isNotificationPanelOpen);
    }
    
    function handleNotificationPanelClose() {
        setIsNotificationPanelOpen(false);
    }

    const response = () => {
        alert('Operation performed successfully!')
    }
    
    return (
        <div>
            <div className={color ? 'header header-bg' : 'header'}>
                <Link to='/admin'>
                    <h1 style={logo}>ALLOCATOR.</h1>
                </Link>
                <ul style={{ listStyle: 'none' }} className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li><NavLink to='/admin'>Home</NavLink></li>
                    <li><NavLink to='/instituteSchedule'>Schedule</NavLink></li>
                    <CustomDropdown items={[{
                        name: 'Departments',
                        value: 'departments',
                        path: '/departments'
                    },
                    {
                        name: 'Batches',
                        value: 'batches',
                        path: '/batches'
                    },
                    {
                        name: 'Rooms',
                        value: 'rooms',
                        path: '/rooms'
                    },
                    {
                        name: 'Objects',
                        value: 'objects',
                        path: '/objects'
                    },
                    {
                        name: 'Positions',
                        value: 'positions',
                        path: '/positions'
                    },
                    {
                        name: 'Courses',
                        value: 'courses',
                        path: '/courses'
                    },
                    {
                        name: 'Faculty',
                        value: 'faculty',
                        path: '/faculty'
                    },
                    {
                        name: 'Assigned courses',
                        value: 'assigned courses',
                        path: '/assignedCourses'
                    }]} />
                    <li>
                        <NavLink onClick={handleNotificationIconClick}>
                            <Badge badgeContent={notificationNum + weightageNotificationsNum} color="info">
                                <NotificationsIcon style={{color: '#fff', height: '20px'}} />
                            </Badge>
                        </NavLink>
                    </li>
                    <li> <NavLink onClick={handleLogout}>Logout</NavLink></li>
                </ul >
                {isNotificationPanelOpen && (
                    <div className="notification-panel" onMouseLeave={handleNotificationPanelClose}>
                        <h2>NOTIFICATIONS</h2>
                        {
                            weightageNotificationDetails.length !== 0 ?
                            <ul>
                                {
                                    weightageNotificationDetails.slice(0).reverse().map((notification, index) => 
                                    <li key={index}>
                                        <h3 style={{fontWeight: 'normal', fontSize: '15px'}}>{notification.faculty}'s Replacement for {notification.courseName} ({notification.batchYear}-{notification.department}).</h3>
                                        <h3>Date: {notification.date}</h3>
                                        <div>
                                            <p className="space-line"></p> 
                                            {
                                                notification.replacingFacultyDetails.map((faculty, index) =>
                                                <p style={{display: 'block'}}>{faculty.name} 
                                                <p style={{fontWeight: 'lighter'}}> (Weightage: {faculty.weightage.toFixed(2)} out of 1)</p>
                                                <p onClick={response}><CheckIcon facultyId={faculty.id} assignedCourse={notification.assignedCourse} 
                                                    weightageId={notification.weightageId} setRefresh={setRefresh}/></p>
                                                </p>)
                                            }
                                        </div>
                                    </li>)
                                }
                            </ul> : null
                        }
                        {
                            notificationNum !== 0 ? 
                            <ul>
                                {
                                    notifications.slice(0).reverse().map((notification, index) =>
                                    <li key={index}>
                                        <h3 style={{fontWeight: 'normal', fontSize: '15px'}}>{notification.title}</h3>
                                        <h3>Date: {notification.date}</h3>
                                        {
                                            notification.details.length > 0 ? 
                                            <div>
                                                <p className="space-line"></p>
                                                <p style={{display: 'block'}}> 
                                                    <p style={{fontWeight: 'lighter'}}>Replaced by: </p>
                                                    {notification.details}
                                                </p>
                                            </div> : null
                                        }
                                    </li>
                                    )
                                }
                            </ul> : <h4 style={{color: 'gray', fontWeight: 'normal', marginTop: '15px'}}>No notifications found.</h4>
                        }
                    </div>
                )}
                <div className="hamburger" onClick={handleClick}>
                    {
                        click ? <FaTimes size={20} style={{ color: '#fff' }} /> :
                            <FaBars size={20} style={{ color: '#fff' }} />
                    }
                </div>
            </div >
        </div >
    )
}

export default AdminNavBar