import React from 'react'
import NavbarWebsite from './NavbarWebsite'
import { Routes,Route } from 'react-router-dom'
import Home from './Home'
import Services from './Services'
import Contact from './Contact'
import About from './About'

const WebsiteHome = () => {
  return (
    <div>
        <NavbarWebsite/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="service" element={<Services />} /> 
            <Route path="contact" element={<Contact />} /> 
            <Route path="about" element={<About />} /> 
        </Routes>
    </div>
  )
}

export default WebsiteHome