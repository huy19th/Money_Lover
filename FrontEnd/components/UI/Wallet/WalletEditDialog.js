import { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Checkbox } from '@mui/material';
import { Truculenta } from '@next/font/google';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function WalletEditDialog({ data, wallet, setShow }) {
    const handleClose = () => setShow(false);

    const [values, setValues] = useState({
        walletId: wallet.id,
        name: wallet.name,
        initialBalance: wallet.initialBalance,
        includeTotal: wallet.includeTotal,
        active: wallet.active
    });

    const handleChange = event => {
        let selectedWallet = data.filter(item => item.id == values.walletId)[0];
        if (event.target.name == "walletId") {
            selectedWallet = data.filter(item => item.id == event.target.value)[0];
            setValues({ ...selectedWallet, walletId: selectedWallet.id });
        }
        else {
            setValues({
                ...values,
                [event.target.name]: event.target.value
            })
        }
    }

    const handleCheck = event => {
        setValues({
            ...values,
            [event.target.name]: !values[event.target.name]
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log(values)
    }

    return (
        <Modal show={true} onHide={handleClose} centered>
            <form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>Edit Wallet</Modal.Title>
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
                    <FormControl fullWidth sx={{ mb: 1 }}>
                        <TextField id="outlined-basic" label="Initial Balance" variant="outlined" type="number"
                            name="initialBalance"
                            value={values.initialBalance}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <hr />
                    <div className="mb-3 d-flex align-items-center">
                        <Checkbox {...label} checked={!values.includeTotal} color="success"
                            name="includeTotal"
                            onChange={handleCheck}
                        />
                        <div className="d-inline-flex flex-column ms-3">
                            <span>Excluded from Total</span>
                            <span className="text-secondary" style={{ "font-size": "12px" }}>
                                Exclude this wallet and its balance in the "Total" mode.
                            </span>
                        </div>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                        <Checkbox {...label} checked={!values.active} color="success"
                            name="active"
                            onChange={handleCheck}
                        />
                        <div className="d-inline-flex flex-column ms-3">
                            <span>Archived</span>
                            <span className="text-secondary" style={{ "font-size": "12px" }}>
                                Freeze this wallet and stop generating bills & recurring transactions.
                            </span>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button color="success" onClick={handleClose} sx={{ mr: 2 }}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="success" type="submit">
                        Save
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}