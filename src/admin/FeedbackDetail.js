import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { getFormAndSubmissions } from '../firbaseUtils';
import Navbar from './Navbar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { MdKeyboardArrowDown } from "react-icons/md";
const FeedbackDetail = () => {
    const location = useLocation()
    const formId = location.state.formId
    const [data,setData] = useState()

    useEffect(()=>{
        getFormAndSubmissions(formId).then((response) =>{
            setData(response)   
        })
    },[formId])

    const formatDate = (time)=>{
        
        const date = new Date(time);
        const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        });
        return formattedDate;
    }
    return (
       <>
       <Navbar/>
       {
        data && (
            <>
                <div className='w-[95%] mx-auto mt-5 bg-white'>
                    <div className='bg-[#5578F4] text-white p-4 flex items-center justify-between'>
                       <p className='font-bold text-xl'>{data.form.structure.formTitle}</p>
                       <p>Created Date: {formatDate(data.form.structure.createdOn)}</p>
                    </div>
                    <div className='bg-white p-4'>
                        <div className='flex gap-5'>
                            <div className='flex flex-col items-center'>
                                <h1 className='text-[40px] font-bold'>{data.form.structure.views}</h1>
                                <p>VIEWS</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <h1 className='text-[40px] font-bold' >{data.form.structure.submission_count}</h1>
                                <p>SUBMITTED</p>
                            </div>
                        </div>
                        <div className='my-4'>
                            <p>Page URL contains {data.form.structure.url_condition ? data.form.structure.url_condition : "NA"}</p>
                            <p>Date : {data.form.structure.date_condition ? data.form.structure.date_condition : "NA"}</p>
                            <p>Time : {data.form.structure.time_condition ? data.form.structure.time_condition : "NA"}</p>
                        </div>
                        <div>
                            <h2 className='text-[24px] font-semibold'>Feedback List</h2>
                            {
                                data.submissions && data.submissions.map((submission,index) => {
                                    return (
                                        <>
                                            <div className='mb-3' key={index}>
                                            <Accordion>
                                                <AccordionSummary
                                                expandIcon={<MdKeyboardArrowDown/>}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                                >
                                                <div className='flex w-[100%] justify-between items-center'>
                                                    <p className='text-[#254AA8DE] font-semibold'>Feedback {index+1}</p>
                                                    <p className='text-sm'>{formatDate(submission.structure.submittedOn)}</p>
                                                </div>
                                            
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <div className='w-full border p-3'>
                                                        {
                                                            submission.structure.form && submission.structure.form.map((field,index)=>{
                                                                return (
                                                                    <div key={index}>
                                                                        <p>{field.label}</p>
                                                                        <p className='text-[#2323239E] text-sm'>{field.value}</p>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </AccordionDetails>
                                            </Accordion>
                                            </div>
                                        </>
                                    )
                                })
                            }
                               
                        </div>

                    </div>
                </div>
            </>
        )
       }
       </>
    )
}

export default FeedbackDetail