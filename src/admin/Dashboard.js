import React from 'react'
import FeedbackCard from './FeedbackCard'
import PlusIcon from '../assetts/plus-icon.svg'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { getAllFormStructures,deleteFormAndSubmissions } from '../firbaseUtils';

const Dashboard = () => {

    const [open, setOpen] = useState(false);
    const [title,setTitle] = useState('')
    const [forms,setForms] = useState('')


    const navigate = useNavigate()

    const handleClickOpen = () => {
        setTitle('')
        setOpen(true);
        
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
        getAllFormStructures().then((forms) => {
            if (forms.length > 0) {
              setForms(forms);
            } else {
              console.log('No forms found.');
            }
        });
   
    },[])
    
   const handleDelete = async (formId) => {
    await deleteFormAndSubmissions(formId)
    await  getAllFormStructures().then((forms) => {
        if (forms.length > 0) {
          setForms(forms);
        } else {
          console.log('No forms found.');
        }
    });

   }

    return (
        <>
        <Navbar/>
        <div className='flex flex-wrap gap-8 m-3 mx-11'>
            <div className='w-[18rem] bg-white rounded-md shadow-md flex flex-col items-center justify-center'>
                <img src={PlusIcon} alt='img' className='mt-5' onClick={handleClickOpen}/>
                <h1 className='text-[32px] text-black font-semibold mt-5'>New Form</h1>
            </div>
            {
                forms && forms.map((item,index)=>{
                    return (
                        <div key={index}>
                            <FeedbackCard 
                            deleteForm={handleDelete}
                            formData = {item}
                            />
                        </div>
                    )
                })
            }
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    
                    handleClose();
                    navigate('/admin/generate-page',{ state: { title: title } });
                },
                }}
            >
            <DialogTitle>Create Feedback Form</DialogTitle>
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
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
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
                <Button  color='success' style={{fontWeight:'bold' }} type="submit" disabled={title.length===0}>CREATE</Button>
                <Button color='secondary' onClick={handleClose}  style={{ color: 'gray' ,fontWeight:'bold' }}>CANCEL</Button>
            </DialogActions>
        </Dialog>
        </div>
        </>
    )
}

export default Dashboard