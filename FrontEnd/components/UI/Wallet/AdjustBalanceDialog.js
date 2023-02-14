import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import WalletService from '@/services/wallet.service';

export default function AdjustBalanceDialog({ setShow, data, selectedItem }) {

    const [values, setValues] = useState({
        walletId: selectedItem.id,
        balance: selectedItem.balance,
    })

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

    const handleSubmit = () => {
        WalletService.adjustBalance(values)
        .then(res => {
            console.log(res);
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
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" disabled={!isValidated}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}