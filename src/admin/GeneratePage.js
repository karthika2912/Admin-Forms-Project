import React from 'react'

import { MdModeEditOutline } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import TextAreaIcon from '../assetts/text-area-icon.svg';
import NumericRating from '../assetts/number-icon.svg';
import StarRating from '../assetts/star_icon.svg';
import SmileyRating from '../assetts/smiley_icon.svg';
import InputIcon from '../assetts/input-icon.svg';
import RadioIcon from '../assetts/radio_icon.svg';
import Categories from '../assetts/categories.svg';
import { useState ,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { Button } from '@mui/material';
import MyGrid from './MyGrid';
import 'react-datepicker/dist/react-datepicker.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import {saveFormStructure} from '../firbaseUtils';
import Snackbar from '@mui/material/Snackbar';


const GeneratePage = () => {

    const [selected,setSelected] = useState(null)
    const [checked, setChecked] = useState(true);
    const [fields,setFields] = useState([])
    const [labelValue,setLabelValue]=useState('')
    const [errorMsg, setErrorMsg]= useState('')
    const [options, setOptions] = useState(['option1','option2','option3'])
    const [isEdit, setIsEdit] = useState(false)
    const [editItem,setEditItem] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null);
    const [url,setURL] = useState('')
    const [time,setTime] = useState('')
    const [showUrl,setShowURL] = useState(false)
    const [showTime, setShowTime] = useState(false)
    const [showDate , setShowDate] = useState(false)

    const [open, setOpen] = useState(false);
    const location = useLocation()
    const [title,setTitle] = useState('')
    const [titleChange, setTitleChange]= useState(title)

    const [openSnackBar,setSnackBar] = useState(false)

    const [editForm,setEditForm] = useState(false)
    const [snackBarContent,setSnackBarContent] = useState('')
  
    
    useEffect(()=>{
        if(location.state.title){
            setTitle(location.state.title)
            setTitleChange(location.state.title)
        }
        
        if(location.state.formData){
            setFields(location.state.formData.structure.fields)
            setTitle(location.state.formData.structure.formTitle)
            setURL(location.state.formData.structure.url_condition)
            setTime(location.state.formData.structure.time_condition)
            setSelectedDate(location.state.formData.structure.date_condition)
            setEditForm(true)
            setTitleChange(title)
            if(location.state.formData.structure.date_condition!=null){
                setShowDate(true)
            }
            if(location.state.formData.structure.time_condition!=''){
                setTime(true)
            }
            if(location.state.formData.structure.url_condition!=''){
                setShowURL(true)
            }
            
        }
    },[])

   

    const handleClose = () => {
        setOpen(false);
    };

 

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const OptionsList={
        "Textarea":TextAreaIcon,
        "Numeric Rating":NumericRating,
        "Star Rating":StarRating,
        "Smiley Rating":SmileyRating,
        "Single line input":InputIcon,
        "Radio Button":RadioIcon,
        "Categories": Categories
    }

    const handleClick = (item) => {
        setSelected(item)
        setLabelValue('')
        setErrorMsg('')
        setChecked(false)
        setOptions(['option1','option2','option3'])
    }

    const handleAddField = () => {
        
       
        const obj = {
            field:selected,
            label:labelValue,
            required:checked,
            errorMsg:errorMsg
        }
        if(selected == 'Radio Button' || selected == 'Categories'){
            obj['options']=options
        }
        setFields([...fields, obj])
        handleCancel();
       
    }
    const handleCancel=()=>{
        setLabelValue('')
        setChecked(false)
        setErrorMsg('')
        setSelected(null)
    }
    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };
    const handleDelete = (index) => {
        setFields(fields.filter((_, i) => i !== index));
    };
    const handleEdit = (index) => {
        setSelected(fields[index].field)
        setIsEdit(true)
        setEditItem(index)
        setLabelValue(fields[index].label)
        setChecked(fields[index].required)
        setErrorMsg(fields[index].errorMsg)
        setOptions(fields[index].options)
    }

    const handleEditField = () => {
       
        fields[editItem]={
            field:selected,
            label:labelValue,
            required:checked,
            errorMsg:errorMsg,
            
        }
        if(options!=undefined){
            fields[editItem]['options']=options
        }
        setFields(fields)
        setIsEdit(false)
    }

    const handlePublishClick = () => {

        if(fields.length==0){
            setSnackBarContent("Add atleast one field to Publish")
            setSnackBar(true)
        }

        if(fields.length>7){
            setSnackBarContent("Cannot contain more than Seven fields")
            setSnackBar(true)
        }
        if(title.trim().length==0)
        {
            setSnackBarContent("Form Title should contain atleast one character")
            setSnackBar(true)
        }

        if(fields.length>0 && fields.length<=7 && title.trim().length!=0){
            let formId;
            if(editForm){
                formId = location.state.formData.id
            }
            else{
                formId="Form-"+Date.now()
            }
            const formStructure = {
                formTitle: title,
                createdOn: Date.now(),
                fields:fields,
                url_condition:showUrl ? url:'',
                time_condition:showTime ? time:'',
                date_condition:showDate ? selectedDate : null,
                submission_count:0,
                views:0,
                submitted_by:[]
                
            }
    
            saveFormStructure(formId,formStructure)
            if(editForm){
                setSnackBarContent("Saved Form Successfully")
            }
            else {
                setSnackBarContent("Published Form Successfully")
            }
            setSnackBar(true)
            setFields([])
            setTitle('')
            setEditForm(false)
        
        }
        
    }

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackBar(false);
    };
      

  return (
    <>
        <Navbar handlePublish={handlePublishClick} isEdit={editForm}/>
        <div className='flex'>
        <div className='w-[100%] flex flex-col items-center justify-center'> 
            <div className='w-[25rem] shadow-lg rounded-lg'>
                <div className='bg-[#5578F4] p-2 text-white font-bold flex items-center gap-1 px-4 py-6 rounded-b-none rounded-t-lg mt-5'>
                    <MdOutlineKeyboardArrowLeft className='font-bold' size={35}/>
                    <p className='text-[20px]'>{title}</p>
                    <MdModeEditOutline className='font-bold' size={25} onClick={() => setOpen(true)}/>
                </div>
             {
                fields.length === 0 && (
                    <div className='bg-white min-h-[30rem] rounded-lg flex flex-col items-center justify-center'>
                        <p className='text-[#5C5858] text-[30px] font-semibold'>Add Fields</p>
                    </div>
                )
             }
                {
                fields.length > 0 && (
                    <div className='bg-white h-fit min-h-[30rem] overflow-auto rounded-lg flex flex-col items-center justify-start'>
                        <MyGrid items={fields} onDelete={handleDelete} onEdit={handleEdit}  setFields={setFields}/>
                    </div>
                )
             }
            </div>
        </div>
        <div className=' w-[25rem] p-5 bg-white mt-[0.10rem]'>
           {
             selected == null && (
                <>
                    <div>
                        <p className='text-[20px]'>Add Fields</p>
                    </div>
                    <div>
                    {Object.entries(OptionsList).map(([label, IconComponent]) => (
                        <div key={label} className="flex gap-2 items-center w-[100%]">
                            <img src={IconComponent} alt='img'/> 
                            <span className='text-[#2B2B2B] text-[14px]'>{label}</span> 
                                <span className='ml-auto mr-5 text-[#106EA4] font-bold text-[30px] hover:underline cursor-pointer'
                                onClick={()=>handleClick(label)}>+</span>
                        </div>
                    ))}
                    </div>

                    <div>
                        <div className='flex items-center justify-between'>
                            <p className='text-sm'>Show based on Url Conditions</p>
                            <Switch
                                checked={showUrl}
                                onChange={(e)=> setShowURL(e.target.checked) }
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </div>
                       <div>
                       {
                        showUrl && (
                            <TextField 
                                placeholder='http://' 
                                variant='standard'
                                value={url}
                                onChange={(e) => setURL(e.target.value)}
                            />
                        )
                       }
                       </div>
                         <div className='mt-3'>
                         <div className='flex items-center justify-between'>
                            <p className='text-sm'>Show on a Specific Date</p>
                            <Switch
                                checked={showDate}
                                onChange={(e) => setShowDate(e.target.checked)}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </div>
                        {
                            showDate && (
                                <TextField
                                label="Select Date"
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                
                            />
                            )
                        }
                         </div><div className='mt-3'>
                         <div className='flex items-center justify-between'>
                            <p className='text-sm'>Show on Specific Time</p>
                            <Switch
                                checked={showTime}
                                onChange={(e) => setShowTime(e.target.checked)}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </div>
                        {
                            showTime && (
                                <TextField
                                label="Select Time"
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            )
                        }
                         </div>

                    </div>
                </>
             )
           }
           {
             selected && (
                <>
                    <div className='flex gap-1 items-center mb-1'>
                        <MdOutlineKeyboardArrowLeft size={30} onClick={() => setSelected(null)}/>
                            Back to Add Fields
                    </div>
                    {
                       selected && (
                            <>
                                <div className='flex flex-col mt-3'>
                                    <div className='ml-3'>
                                        <TextField id="standard-basic" label="Enter Label" variant="standard" value={labelValue} onChange={(e)=> setLabelValue(e.target.value)}/>
                                    </div>
                                    <div className='flex gap-1 mt-3 items-center text-[12px]'>
                                    <Switch
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    Required
                                    </div>
                                    <div className='ml-3'>
                                    {
                                        checked && (<TextField id="standard-basic" label="Error message" variant="standard" value={errorMsg} onChange={(e)=> setErrorMsg(e.target.value)}/>)
                                    }
                                    </div>
                                    {
                                        (selected=='Radio Button' || selected =='Categories') && (
                                            <div className='p-3'>
                                                {options.map((option, index) => (
                                                    <TextField
                                                    key={index}
                                                    variant="standard"
                                                    type="text"
                                                    value={option}
                                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                                    placeholder={`Option ${index + 1}`}
                                                    />
                                                ))}

                                            </div>
                                        )
                                    }
                                    <div className='mt-5 flex gap-3 mx-3'>
                                    <Button variant="contained" color="primary" onClick={isEdit ? handleEditField : handleAddField }>
                                        SAVE
                                    </Button>
                                    <Button variant="contained" style={{ backgroundColor:'#F5F5F5' ,color:'black'}} onClick={handleCancel}>
                                        CANCEL
                                    </Button>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    
                </>
             )
           }
        </div>
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
            component: 'form',
            onSubmit: (event) => {
                event.preventDefault();
                handleClose();
                setTitle(titleChange)
            },
            }}
        >
            <DialogTitle>Edit</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="email"
                label="Feedback Form Title"
                type="text"
                fullWidth
                variant="standard"
                value={titleChange}
                onChange={(e)=>setTitleChange(e.target.value)}
                InputProps={{
                    style: {
                    color: 'black', 
                    width:'20rem'
                    },
                }}
                InputLabelProps={{
                    style: { color: 'black' }, 
                }}
            />
            </DialogContent>
            <DialogActions>
                <Button  color='success' style={{fontWeight:'bold' }} type="submit" disabled={titleChange.length==0}>SAVE</Button>
                <Button color='secondary' onClick={handleClose}  style={{ color: 'gray' ,fontWeight:'bold' }}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    </div>
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={openSnackBar}
      onClose={handleSnackBarClose}
      autoHideDuration={5000}
      message={snackBarContent}
      key="topright"
    />
    </>
  )
}

export default GeneratePage