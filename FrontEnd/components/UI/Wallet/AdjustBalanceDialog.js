import { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import WalletService from '@/services/wallet.service';
import { useDispatch, useSelector } from 'react-redux';
import { walletActions } from '@/features/wallet/walletSlice';
import {axiosJWT} from "@/configs/axios";
import {transactionActions} from "@/features/transaction/transactionSlice";

export default function AdjustBalanceDialog({ setShow, data, wallet , setSelectedWallet}) {
    const time = useSelector(state => state.time)
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth).currentUser;
    const [values, setValues] = useState({
        walletId: wallet.id,
        balance: wallet.balance,
    })

    const myWallet = useSelector(state => state.wallet.currentWallet)

    const [isValidated, setIsValidated] = useState(false);
    const handleClose = () => setShow(false);

    const handleChange = event => {
        let selectedWallet = data.filter(item => item.id == values.walletId)[0];
        if (event.target.name == "walletId") {
            selectedWallet = data.filter(item => item.id == event.target.value)[0];
            setValues({
                walletId: event.target.value,
                balance: selectedWallet.balance
            });
        }
        else {
            setValues({
                ...values,
                [event.target.name]: event.target.value
            })
        }
        //validate
        if (event.target.name == "balance") {
            console.log(event.target.value)
            console.log(selectedWallet.balance)
            if (!event.target.value) {
                return setIsValidated(false);
            }
            if (event.target.value == selectedWallet.balance) {
                return setIsValidated(false);
            }
            setIsValidated(true);
        }
        else {
            setIsValidated(false);
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        WalletService.adjustBalance(values)
        .then(res => {
            console.log(res);
            WalletService.getAllWalletsOfUser(user.id)
            .then(async res => {
                if (myWallet.id !== 'Total') {
                    if (myWallet.id === wallet.id) {
                        let transactions = (await axiosJWT.get(`/transaction/${wallet.id}`, {
                            params: {
                                year: time.name === 'Last Month' || time.name === 'This Month' || time.name === 'Future' ? time.value.format('MM/YYYY').split('/')[1] : time.name.split('/')[1],
                                month: time.name === 'Last Month' || time.name === 'This Month' || time.name === 'Future' ? time.value.format('MM/YYYY').split('/')[0] : time.name.split('/')[0]
                            }
                        })).data
                        let selectedWallet = res.data.filter(item => item.id == wallet.id)[0];
                        setSelectedWallet(selectedWallet);
                        dispatch(walletActions.changeCurrentWallet(selectedWallet))
                        dispatch(walletActions.getWallets(res.data));
                        dispatch(transactionActions.getTrans(transactions))
                    } else {
                        let selectedWallet = res.data.filter(item => item.id == wallet.id)[0];
                        setSelectedWallet(selectedWallet);
                        dispatch(walletActions.getWallets(res.data));
                    }
                } else {
                    let transactions = (await axiosJWT.get('/transaction', {
                        params: {
                            year: time.name === 'Last Month' || time.name === 'This Month' || time.name === 'Future' ? time.value.format('MM/YYYY').split('/')[1] : time.name.split('/')[1],
                            month: time.name === 'Last Month' || time.name === 'This Month' || time.name === 'Future' ? time.value.format('MM/YYYY').split('/')[0] : time.name.split('/')[0]
                        }
                    })).data
                    let selectedWallet = res.data.filter(item => item.id == wallet.id)[0];
                    setSelectedWallet(selectedWallet);
                    dispatch(walletActions.getWallets(res.data));
                    dispatch(transactionActions.getTrans(transactions))
                }
            })
            handleClose();
        })
    }

    return (
        <>
            <Modal show={true} onHide={handleClose} centered>
                <form onSubmit={handleSubmit}>
                    <Modal.Header>
                        <Modal.Title>Adjust Balance</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel id="select-wallet">Wallet</InputLabel>
                            <Select
                                labelId="select-wallet"
                                id="demo-simple-select"
                                label="Wallet"
                                name="walletId"
                                value={values.walletId}
                                onChange={handleChange}
                            >
                                {
                                    data.map(item =>
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <TextField id="outlined-basic" label="Current balance" variant="outlined" type="number"
                                name="balance"
                                value={values.balance}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="success" onClick={handleClose} sx={{mr: 2}}>
                            Close
                        </Button>
                        <Button variant="contained" color="success" type="submit" disabled={!isValidated}>
                            Save
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}