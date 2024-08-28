import React from 'react'
import AdminLogo from '../assetts/admin-logo.svg'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@mui/material';

const Navbar = ({handlePublish ,isEdit}) => {

    const location = useLocation();
    
    const [path,setPath] = useState(location.pathname)

    return (
    <div className='shadow-xl flex justify-between bg-white items-center px-3'>
        <div className='flex gap-1 items-center'>
            <img src={AdminLogo} alt='img'/>  
            <p className='text-[#262626] text-[24px] font-bold'>USER FEEDBACK</p>
        </div>

        {
            (path === '/admin/generate-page' && !isEdit) &&(
                <Button color='primary' variant='contained' className='h-[30px] mr-4' onClick={handlePublish}>PUBLISH</Button>
                
            )
        }
        {
            (path === '/admin/generate-page' && isEdit ) && (
                <Button color='success' variant='contained' className='h-[30px] mr-4' onClick={handlePublish}>SAVE</Button>
                
            )
        }
        
    </div>
  )
}

export default Navbar