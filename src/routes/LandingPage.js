import React from 'react'
import Navbar from '../components/Navbar'
import Domains from '../components/Domains'
import Intro from '../components/Intro'
import Education from '../components/Education'
import Factory from '../components/Factory'

const LandingPage = () => {
    return (
        <div>
            <Navbar />
            <Intro />
            <Domains />
            <Education />
            <Factory />
        </div>
    )
}

export default LandingPage