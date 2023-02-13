import * as React from 'react';
import Card from "react-bootstrap/Card";
import CloseIcon from '@mui/icons-material/Close';
import styles from "@/styles/TransOverview.module.css";
import Button from "@mui/material/Button";
import {DialogContentText, Slide} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {axiosJWT} from "@/configs/axios";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function TranDetail(props) {

    const handleOver = (event) => {
        event.target.classList.add(styles.changePointer)
    }

    const handleDelete = async () => {
        // Gọi api xóa
        await axiosJWT.delete(`/transaction/${props.detail.id}`);
        // Goị api trả lại dữ liệu

        setOpen(false)
    }

    const myHandleCLose = () => {
        props.close()
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card style={{marginTop:'20px', marginRight: "auto", marginLeft: "auto"}}>
            <Card.Header>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <CloseIcon className='ms-2' onClick={myHandleCLose} onMouseOver={(event) => handleOver(event)}/>
                        <p className='m-0 ms-3' style={{fontWeight: "bold", fontSize: '16px'}}>Transaction Details</p>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Button style={{color: 'red'}} onClick={handleClickOpen}>Delete</Button>
                        <Button style={{color: 'green'}}>Edit</Button>
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <div className='ms-5'>
                    <p style={{fontSize: '20px'}}>{props.detail.subCate_name}</p>
                    <p>{props.detail.wallet_name}</p>
                    <p style={{opacity: 0.7}}>{props.detail.date}</p>
                    <hr style={{width: '200px'}}/>
                    <p>{props.detail.note}</p>
                    {props.detail.type_name === 'Expenese' ? (
                        <p style={{color: 'red', fontSize: '36px'}}>-{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.detail.money)}</p>
                    ) : (
                        <p style={{color: "dodgerblue", fontSize: '36px'}}>+{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.detail.money)}</p>
                    )}
                </div>
            </Card.Body>
            <Dialog
                fullWidth='sm'
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Confirm deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Delete this transaction?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleDelete}>Yes</Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
}