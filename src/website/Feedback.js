import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import {saveFormSubmission } from '../firbaseUtils';
import NumericRating from '../admin/NumericRating';
import StarRating from '../admin/StarRating';
import SmileyRating from '../admin/SmileyRating';
import { Button } from '@mui/material';

import { getMatchingForm } from '../firbaseUtils';

const Feedback = ({ closeDialog , currentPath}) => {
  
  const [currentForm, setCurrentForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [showEmpty,setShowEmpty] = useState(false)

  useEffect(()=>{
  
    const getForm = async () => {
      const currentUrl = currentPath
      const currentTime = new Date().toTimeString().slice(0, 5); 
      const currentDate = new Date().toISOString().split('T')[0];
      const response = await getMatchingForm(currentUrl,currentTime,currentDate)
      if(response){
        setCurrentForm(response)
      }
      else{
        setShowEmpty(true)
      }
    }

    getForm()
    
  },[])

  const [selectedOption, setSelectedOption] = useState('');
  const handleRadioChange = (e) => setSelectedOption(e.target.value);

  const [category, setCategory] = useState('');
  const handleCategoryClick = (e, item) => setCategory(item);

  const [rating, setRating] = useState(null);
  const handleRatingSelect = (selectedRating) => setRating(selectedRating);

  const [starRating, setStarRating] = useState(null);
  const handleStarRatingSelect = (selectedRating) => setStarRating(selectedRating);

  const [smileyRating, setSmileyRating] = useState(null);
  const handleSmileyRatingSelect = (selectedRating) => setSmileyRating(selectedRating);

  const [singleInput, setSingleInput] = useState('');
  const [multipleInput, setMultipleInput] = useState('');

  const validateForm = () => {
    const newErrors = {};
  const valueArr = []; 

  currentForm.structure.fields.forEach((field, index) => {
    let value = null;
   
    if (field.field === 'Textarea') {
      value = multipleInput;
    } else if (field.field === 'Numeric Rating') {
      value = rating;
    } else if (field.field === 'Star Rating') {
      value = starRating;
    } else if (field.field === 'Smiley Rating') {
      value = smileyRating;
    } else if (field.field === 'Single line input') {
      value = singleInput.trim();
    } else if (field.field === 'Radio Button') {
      value = selectedOption;
    } else if (field.field === 'Categories') {
      value = category;
    }
    const fieldData = {
      type: field.field,
      value: value || null, 
      label: field.label,
    };
    valueArr.push(fieldData); 
    if (field.required && !value) {
      newErrors[index] = field.errorMsg || 'This field is required.';
    }
  });
  setErrors(newErrors);
  if(Object.keys(newErrors).length === 0){
    
    if(currentForm)
        {
            const submissionId='Submission'+Date.now()
            const submissionStructure = {
              form : valueArr,
              submittedOn: Date.now(),
              time_condition:currentForm.structure.time_condition,
              url_condition:currentForm.structure.url_condition,
              date_condition:currentForm.structure.date_condition,
              formId:currentForm.formId,
              submitted_by:localStorage.getItem('username')
            }
           
            saveFormSubmission(submissionId,submissionStructure,currentForm.formId)
            closeDialog()
        }
    }
  };

  const handleSubmit = () => {
   validateForm()
  };

 
  return (
    <>
      {showEmpty  && (
        <div className='p-3 flex justify-between w-[100%]'>No Form Found!<span className='font-semibold cursor-pointer' onClick={closeDialog}>X</span></div>
      )

      }
      {currentForm && (
        <>
          <div className='w-fit shadow-xl rounded-md min-w-[25rem]'>
            <div className='bg-[#5578F4] text-white font-bold flex items-center gap-1 px-4 py-3'>
              <MdOutlineKeyboardArrowLeft className='font-bold' size={35} />
              <p className='text-[20px]'>{currentForm.structure.formTitle}</p>
              <button onClick={closeDialog} className='ml-auto'>
                x
              </button>
            </div>
            <div className='p-2 px-4 h-[30rem] overflow-y-auto flex flex-col items-center'>
              {currentForm.structure.fields.map((field, index) => (
                <div className='p-2 shadow-md rounded-md mb-3 w-full' key={index}>
                  <label className='text-sm mb-4'>{field.label}</label>
                  {field.field === 'Textarea' && (
                    <div>
                      <textarea
                      rows="3"
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 border-none leading-tight focus:outline-none focus:shadow-outline text-sm`}
                      value={multipleInput}
                      onChange={(e) => setMultipleInput(e.target.value)}
                    ></textarea>
                    </div>
                  )}
                  {field.field === 'Numeric Rating' && (
                    <NumericRating
                      onRatingSelect={handleRatingSelect}
                    />
                  )}
                  {field.field === 'Star Rating' && (
                    <StarRating
                      onRatingSelect={handleStarRatingSelect}
                    />
                  )}
                  {field.field === 'Smiley Rating' && (
                    <SmileyRating
                      onRatingSelect={handleSmileyRatingSelect}
                    />
                  )}
                  {field.field === 'Single line input' && (
                    <input
                      type='text'
                      value={singleInput}
                      onChange={(e) => setSingleInput(e.target.value)}
                      className='w-full border border-gray-300 focus:border-gray-300'
                    />
                  )}
                  {field.field === 'Radio Button' && (
                    <div>
                      {field.options.map((option, idx) => (
                        <div key={idx} className='flex items-center'>
                          <input
                            type='radio'
                            id={`option-${idx}`}
                            name={`options-${index}`}
                            value={option}
                            checked={selectedOption === option}
                            onChange={handleRadioChange}
                          />
                          <label htmlFor={`option-${idx}`} className='ml-2 text-[14px]'>
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                  {field.field === 'Categories' && (
                    <div className='flex gap-2'>
                      {field.options.map((option, idx) => (
                        <Button
                          key={idx}
                          onClick={(e) => handleCategoryClick(e, option)}
                          variant='contained'
                          style={{
                            backgroundColor: category === option ? 'gray' : 'white',
                            color: 'black'
                          }}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}
                  {errors[index] && (
                    <p className='text-red-500 text-sm mt-1'>{errors[index]}</p>
                  )}
                </div>
              ))}
              <Button variant='contained' color='primary' className='ml-auto mb-3 mt-auto' onClick={handleSubmit}>
                SUBMIT
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Feedback;
