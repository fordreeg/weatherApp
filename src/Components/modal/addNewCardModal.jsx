import React, {useState} from 'react';import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from "@mui/icons-material/Add";
import {Fab} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getNewCity, setNewCityName} from "../../Redux/city_list_reducer";
import style from './modalMoreDetails.module.scss'


const AddNewCardModal = () => {
    const [open, setOpen] = useState(false),
         [error, setError] = useState(false),
        dispatch = useDispatch();
    const newCityName = useSelector(state => state.cities.newCityName),
         store = useSelector(state => state.cities.newCityName);
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const handleSubmit = () => {
        let response = dispatch(getNewCity(newCityName)).then(
            result => setOpen(false),
            error => setError(error.response.data.message)
        );
    };
    
    const onChange = (e) => {
        dispatch(setNewCityName(e.target.value))
    };
    return (
        <div>
            <Fab color="inherit" aria-label="add" sx={{
                color: '#ffff',
                backgroundColor: 'transparent',
                ":hover": {backgroundColor: '#50505078'},
                border: `${1}px solid #bfbfbf`
            }}
                 onClick={handleClickOpen}
            >
                <AddIcon/>
            </Fab>
            <Dialog open={open} onClose={handleClose} sx={{
                '.MuiPaper-root': {
                    backgroundColor: 'rgba(0, 0, 0, .5)',
                    backdropFilter: 'blur(7px)',
                },'.MuiInputBase-root::before': {
                    borderColor: '#ffff',
                },'.MuiInputBase-root': {
                    color: '#ffff',
                }, '.MuiInputLabel-root': {
                    color: '#ffff',
                }
            }}>
                <DialogTitle sx={{color: '#ffff'}}>Add new city</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{color: '#ffff'}}>
                        To add a new city, enter the city name and country separated by commas. <br/>
                        Example: <span className={style.example}>Kharkiv, UA</span>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Kharkiv, UA"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCityName}
                        onChange={onChange}
                    />
                    <div className={style.error}>
                        {error && error.toUpperCase()}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddNewCardModal;