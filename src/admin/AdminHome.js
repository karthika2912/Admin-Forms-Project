import React from 'react'
import Dashboard from './Dashboard'
import { Routes, Route } from 'react-router-dom';
import GeneratePage from './GeneratePage';
import FeedbackDetail from './FeedbackDetail';

const AdminHome = () => {
  return (
    <div>
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/generate-page" element={<GeneratePage />} /> 
            <Route path="/detail-page" element={<FeedbackDetail/>}/>
        </Routes>
    </div>
  )
}

export default AdminHome