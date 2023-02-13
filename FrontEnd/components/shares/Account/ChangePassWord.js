import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextField from '@mui/material/TextField';
import {ChangePassword} from '@/services/user.service'
import InputLabel from "@mui/material/InputLabel";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {InputAdornment, OutlinedInput} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import {useEffect, useState} from "react";


export default function AlertDialog() {
    const [open, setOpen] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [showPassword1, setShowPassword1] = React.useState(false);

    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

    const handleMouseDownPassword1 = (event) => {
        event.preventDefault();
    };
    const [showPassword2, setShowPassword2] = React.useState(false);

    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [changePassword, setChangePassword] = useState([]);
    useEffect(()=>{
        ChangePassword().then(result => {
            setChangePassword(result);
        })
    },[])

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Change Password
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogTitle id="alert-dialog-title">
                    {"Change PassWord"}
                </DialogTitle>
                <DialogContent>
                    {/*<TextField id="outlined-basic" label="Password old" variant="outlined" className="w-100 pb-3 mt-3"/>*/}
                    {/*<TextField id="outlined-basic" label="Password new" variant="outlined" className="w-100 pb-3"/>*/}
                    {/*<TextField id="outlined-basic" label="Confirm password" variant="outlined" className="w-100 pb-3"/>*/}
                    <FormControl variant="outlined" className="w-100 pb-3 mt-3">
                        <InputLabel htmlFor="outlined-adornment-password">Password Old</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password Old"
                        />
                    </FormControl>
                    <FormControl variant="outlined" className="w-100 pb-3 mt-3">
                        <InputLabel htmlFor="outlined-adornment-password">Password New</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword1 ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword1}
                                        onMouseDown={handleMouseDownPassword1}
                                        edge="end"
                                    >
                                        {showPassword1 ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password New"
                        />
                    </FormControl>
                    <FormControl variant="outlined" className="w-100 pb-3 mt-3">
                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword2 ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword2}
                                        onMouseDown={handleMouseDownPassword2}
                                        edge="end"
                                    >
                                        {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Confirm PassWord"
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose} autoFocus>
                       Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}