import React from 'react'
import Hero from '../../Components/LandingPage/Hero'
import Features from '../../Components/LandingPage/Features'
import About from '../../Components/LandingPage/About'
import Contact from '../../Components/LandingPage/Contact'
import Footer from '../../Components/Footer/Footer'

const LandingPage = () => {
    return (
        <div>
            <Hero/>
            <Features/>
            <About/>
            <Contact/>
            <Footer/>
        </div>
    )
}

export default LandingPage