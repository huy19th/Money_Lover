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
import {walletActions} from "@/features/wallet/walletSlice";
import {transactionActions} from "@/features/transaction/transactionSlice";
import {useDispatch, useSelector} from "react-redux";
import EditTransactionForm from "@/components/UI/DashBoard/EditTransaction/EditTransactionForm";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function TranDetail(props) {

    const myWallet = useSelector(state => state.wallet.currentWallet)

    const dispatch = useDispatch()

    const handleOver = (event) => {
        event.target.classList.add(styles.changePointer)
    }

    const handleEdit = () => {

    }

    const handleDelete = async () => {
        // Gọi api xóa
        await axiosJWT.delete(`/transaction/${props.detail.id}`);
        // Goị api trả lại dữ liệu
        if (myWallet.id === props.detail.wallet_id) {
            let wallet = (await axiosJWT.get(`/wallet/info/${props.detail.wallet_id}`)).data
            let transactions = (await axiosJWT.get(`/transaction/${props.detail.wallet_id}`)).data
            dispatch(walletActions.changeCurrentWallet(wallet))
            dispatch(transactionActions.getTrans(transactions))
            dispatch(walletActions.changeWallets({
                walletInfo: wallet,
                walletId: props.detail.wallet_id
            }))
        } else {
            let wallet = (await axiosJWT.get(`/wallet/info/${props.detail.wallet_id}`)).data
            let transactions = (await axiosJWT.get('/transaction')).data
            dispatch(walletActions.changeWallets({
                walletInfo: wallet,
                walletId: props.detail.wallet_id
            }))
            dispatch(transactionActions.getTrans(transactions))
            dispatch(walletActions.resetCurrentWallet())
        }
        setOpenDeleteDialog(false)
        props.close()
    }

    const myHandleCLose = () => {
        props.close()
    }

    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);

    const handleClickOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const handleClickOpenEditDialog = () => {
        setOpenEditDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
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
                        <Button style={{color: 'red'}} onClick={handleClickOpenDeleteDialog}>Delete</Button>
                        <Button style={{color: 'green'}} onClick={handleClickOpenEditDialog}>Edit</Button>
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

            {/*Delete Dialog*/}
            <Dialog
                fullWidth='sm'
                open={openDeleteDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDeleteDialog}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Confirm deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Delete this transaction?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>No</Button>
                    <Button onClick={handleDelete}>Yes</Button>
                </DialogActions>
            </Dialog>

            {/*Edit Dialog*/}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}  fullWidth='sm'>
                <DialogTitle>Edit Transaction</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <EditTransactionForm data={props.detail} close={handleCloseEditDialog}/>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </Card>
    )
}