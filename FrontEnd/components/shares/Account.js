import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {FaUserCircle} from "react-icons/fa";
import {Col, Row} from "react-bootstrap";
import Link from "next/link";
import {axiosJWT} from "@/configs/axios";
import {authActions} from "@/features/auth/authSlice";
import {walletActions} from "@/features/wallet/walletSlice";
import {transactionActions} from "@/features/transaction/transactionSlice";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function AccountUser() {
    const router = useRouter()
    const user = useSelector(state => state.auth.currentUser)
    const dispatch = useDispatch()

    const logOut = async () => {
        await axiosJWT.get('http://localhost:8000/api/auth/logout', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(authActions.loggedOut());
        dispatch(walletActions.resetWallet())
        dispatch(transactionActions.resetTrans())
        router.push('/login')
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <FaUserCircle style={{fontSize:'30px'}} onClick={handleClickOpen}/>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <div>
                        <Row>
                            <Col>
                                <h3>My account</h3>
                            </Col>
                            <Col style={{textAlign:'right',marginRight:'30px'}}>
                                <Link style={{textDecoration:'none',color:'green'}} href='#' onClick={logOut}>SIGN OUT</Link>
                            </Col>
                        </Row>
                    </div>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div>
                        <Row>
                            <Col sm={2}>
                                <img style={{width:'80px'}} src="https://static.moneylover.me/img/icon/ic_category_all.png" alt=""/>
                            </Col>
                            <Col>
                                <p>{user.name}</p>
                                <p>{user.email}</p>
                            </Col>
                        </Row>
                    </div>
                    <hr/>
                    <img style={{width:'500px',height:'200px'}} src="https://i.pinimg.com/originals/c9/bc/9c/c9bc9cde36a08a30cd442cdf5780c9c9.jpg" alt=""/>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}