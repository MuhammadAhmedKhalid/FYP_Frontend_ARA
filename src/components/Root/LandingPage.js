import React, { useRef, useState, useEffect } from 'react'
import Navbar from '../Root/Navbar'
import Domains from './Domains'
import Intro from './Intro'
import Education from '../Domains/Education'
import Factory from '../Domains/Factory'
import Hospital from '../Domains/Hospital'
import Office from '../Domains/Office'
import Footer from './Footer'

const LandingPage = () => {
    const [landingPage, setLandingPage] = useState(true)
    const edu_ref = useRef(null);
    const fac_ref = useRef(null);
    const hosp_ref = useRef(null);
    const off_ref = useRef(null);

    // useEffect(() => {
    //     axios.post('http://localhost:8080/add_department')
    //         .then((response) => { console.log(response) })
    //         .catch((error) => { console.log(error) })

    //     axios.post('http://localhost:8080/add_room')
    //         .then((response) => { console.log(response) })
    //         .catch((error) => { console.log(error) })

    //     axios.post('http://localhost:8080/addResourceType')
    //         .then((response) => { console.log(response) })
    //         .catch((error) => { console.log(error) })

    //     axios.post('http://localhost:8080/add_resources')
    //         .then((response) => { console.log(response) })
    //         .catch((error) => { console.log(error) })
    // }, [])

    return (
        <div>
            <Navbar />
            <Intro />
            <Domains landingPage={landingPage} setLandingPage={setLandingPage} edu_ref={edu_ref} fac_ref={fac_ref}
                hosp_ref={hosp_ref} off_ref={off_ref} />
            <Education edu_ref={edu_ref} />
            <Factory fac_ref={fac_ref} />
            <Hospital hosp_ref={hosp_ref} />
            <Office off_ref={off_ref} />
            <Footer />
        </div>
    )
}

export default LandingPage