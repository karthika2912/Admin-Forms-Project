import React, { useEffect, useState ,useCallback} from 'react'
import FormImage from '../assetts/form-image.svg'
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
const FeedbackCard = ({formData,deleteForm}) => {
    
    const [formattedDate,setFormattedDate] = useState()
    const navigate = useNavigate()

    const getFormattedDate = useCallback(() => {
        if (formData.structure.createdOn) {
            const date = new Date(formData.structure.createdOn);
            const formattedDate = date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
            setFormattedDate(formattedDate);
        }
    }, [formData.structure.createdOn]); 
    
    useEffect(() => {
        getFormattedDate();
    }, [getFormattedDate]); 


    const routeToDetailPage = () => {
        navigate('/admin/detail-page',{state:{formId:formData.id}})
    }

    const routeToEditPage = () =>{
        navigate('/admin/generate-page' ,{state:{formData : formData}})
    } 

    const handleDeleteForm = () => {
        deleteForm(formData.id)
    }
    return (
  <>
       <div>
       <div className='bg-[#F5D563] flex items-center justify-center p-2 rounded-b-none rounded-t-lg'>
            <img src={FormImage} alt='img' />
        </div>
        <div className='shadow-md w-[18rem] bg-[#FFFFFF] rounded-lg rounded-t-none p-4'>
            <p className='text-black text-[20px] font-semibold truncate'>{formData.structure.formTitle}</p>
            <div className='mt-3'>
                <div className='flex justify-between items-center'>
                    <p className='text-[#8E8E8E] text-[14px] font-bold'>Submitted</p>
                    <p className='text-[14px]'>{formData.structure.submission_count}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <p className='text-[#8E8E8E] text-[14px] font-bold'>Viewed</p>
                    <p className='text-[14px]'>{formData.structure.views}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <p className='text-[#8E8E8E] text-[14px] font-bold'>Date Published</p>
                    <p className='text-[14px]'>{formattedDate}</p>
                </div>
            </div>
            <div className='flex flex-col items-center mt-9'>
                <Button variant="contained" color="secondary" onClick={routeToDetailPage}>
                    VIEW SUBMISSION
                </Button>
                <div className='flex gap-3 items-center mt-2'>
                <Button variant="contained" color="success" onClick={routeToEditPage}>
                    EDIT
                </Button>
                <Button variant="contained" color="primary" onClick={handleDeleteForm}>
                    DELETE
                </Button>
                </div>
            </div>
        </div>
       </div>
    </>
)
}


export default FeedbackCard