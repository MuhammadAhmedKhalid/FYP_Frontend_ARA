import React, { useState, useEffect } from 'react'
import Img2 from '../../assets/img2.png'
import Img3 from '../../assets/img3.png'
import Img4 from '../../assets/img4.png'
import Img5 from '../../assets/img5.png'
import AdminQuestionnaire from '../Admin/AdminQuestionnaire'
import AdminSimpleNavbar from '../Admin/AdminSimpleNavbar'
import Footer from './Footer'
import axios from 'axios'


function Domains(props) {

    useEffect(() => {
        axios.get('http://localhost:8080/get_institute_types')
            .then((response) => { setInstituteTypes(response.data) })
            .catch((error) => { console.log(error) })
    }, [])

    const [instituteTypes, setInstituteTypes] = useState([])
    const [instituteTypeId, setInstituteTypeId] = useState("")

    const { edu_ref, fac_ref, hosp_ref, off_ref, landingPage } = props

    const [openQuestionnaireModal, setOpenQuestionnaireModal] = useState(false)

    const handleEduClick = () => {
        edu_ref.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const handleFacClick = () => {
        fac_ref.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const handleHospClick = () => {
        hosp_ref.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const handleOffClick = () => {
        off_ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSelect = (e) => {
        setOpenQuestionnaireModal(true)
        for (let i = 0; i < instituteTypes.length; i++) {
            if (instituteTypes[i].name === e.target.value) {
                setInstituteTypeId(instituteTypes[i].institute_type_id)
            }
        }
    }
    return (
        <div>
            <AdminSimpleNavbar />
            <div
                className="flexbox-container-y"
                style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '110vh'
                }}
            >
                <h1 style={{ color: 'black', fontSize: '22px' }}>A Platform Build For A New</h1>
                <h1 style={{ color: '#0E5E6F', fontSize: '22px' }}>Way Of Allocation</h1>
                <p style={{ color: 'black', fontSize: 18 }}>Lorem ipsum dolor sit amet. Ut doloribus enim et nostrud ui quihfhhsh</p>
                <br /><br /><br />
                <div className="flexbox-container" >
                    <div className="flexbox-container-y">
                        <img style={{ width: 250 }} src={Img2} alt='Domain-1' /><br />
                        {
                            landingPage ?
                                <center><button className='btn-w' onClick={handleEduClick}>Education</button></center> :
                                <div
                                    className="flexbox-container-y"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <button className='domains-textField' style={{ color: '#fff', marginBottom: '15px' }}>Education</button>
                                    <select
                                        value={instituteTypes.name}
                                        className='dropdown'
                                        onChange={(e) => handleSelect(e)}>
                                        {
                                            instituteTypes.map(instituteType =>
                                                instituteType.domain === "Education" ?
                                                    <option key={instituteType.institute_type_id}>{instituteType.name}</option> : null)
                                        }
                                    </select>
                                </div>
                        }

                    </div>
                    <div className="flexbox-container-y">
                        <img style={{ width: 250 }} src={Img3} alt='Domain-2' /><br />
                        {
                            landingPage ?
                                <center><button className='btn-w' onClick={handleFacClick}>Factory</button></center> :
                                <div className="flexbox-container-y"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <button className='domains-textField' style={{ color: '#fff', marginBottom: '15px' }}>Factory</button>
                                    <select className='dropdown' defaultValue={"Food"}>
                                        {
                                            instituteTypes.map(instituteType =>
                                                instituteType.domain === "Factory" ?
                                                    <option key={instituteType.institute_type_id}>{instituteType.name}</option> : null)
                                        }
                                    </select>
                                </div>
                        }
                    </div>
                    <div className="flexbox-container-y">
                        <img style={{ width: 250 }} src={Img4} alt='Domain-3' /><br />
                        {
                            landingPage ?
                                <center><button className='btn-w' onClick={handleHospClick}>Hospital</button></center> :
                                <div className="flexbox-container-y"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <button className='domains-textField' style={{ color: '#fff', marginBottom: '15px' }}>Hospital</button>
                                    <select className='dropdown' defaultValue={"Women's hospitals"}>
                                        {
                                            instituteTypes.map(instituteType =>
                                                instituteType.domain === "Hospital" ?
                                                    <option key={instituteType.institute_type_id}>{instituteType.name}</option> : null)
                                        }
                                    </select>
                                </div>
                        }
                    </div>
                    <div className="flexbox-container-y">
                        <img style={{ width: 250 }} src={Img5} alt='Domain-4' /><br />
                        {
                            landingPage ?
                                <center><button className='btn-w' onClick={handleOffClick}>Office</button></center> :
                                <div className="flexbox-container-y"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <button className='domains-textField' style={{ color: '#fff', marginBottom: '15px' }}>Office</button>
                                    <select className='dropdown' defaultValue={"Private Office"}>
                                        {
                                            instituteTypes.map(instituteType =>
                                                instituteType.domain === "Office" ?
                                                    <option key={instituteType.institute_type_id}>{instituteType.name}</option> : null)
                                        }
                                    </select>
                                </div>
                        }
                    </div>
                </div>
            </div>
            <AdminQuestionnaire openQuestionnaireModal={openQuestionnaireModal}
                setOpenQuestionnaireModal={setOpenQuestionnaireModal} />
            {
                !landingPage ? <Footer /> : ''
            }
        </div>
    )
}

export default Domains