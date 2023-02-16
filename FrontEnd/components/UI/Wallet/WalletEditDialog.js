import { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Checkbox } from '@mui/material';
import WalletService from '@/services/wallet.service';
import { useDispatch, useSelector } from 'react-redux';
import { walletActions } from '@/features/wallet/walletSlice';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function WalletEditDialog({ data, wallet, setShow, setSelectedWallet }) {

    const dispatch = useDispatch();

    const handleClose = () => setShow(false);

    const [isValidated, setIsValidated] = useState(false);

    const [values, setValues] = useState({
        walletId: wallet.id,
        name: wallet.name,
        initialBalance: wallet.initialBalance,
        includeTotal: wallet.includeTotal,
        active: wallet.active
    });

    const handleChange = event => {
        let selectedWallet = data.filter(item => item.id == wallet.id)[0];
        let newValues = {
            ...values,
            [event.target.name]: event.target.type == "checkbox" ? !values[event.target.name] : event.target.value
        }
        setValues(newValues);
        if (event.target.name == "name") {
            let oldName = wallet.name;
            let newName = event.target.value;
            let nameIsDuplicated = data.filter(item => item.name == newName)[0];
            if (nameIsDuplicated && newName!= oldName) {
                return setIsValidated(false);
            }
        }
        for (let key in newValues) {
            if (key != "walletId") {
                if ((key == "name" || key == "initialBalance") && !newValues[key]) {
                    return setIsValidated(false);
                }
                if (newValues[key] != selectedWallet[key]) {
                    return setIsValidated(true);
                }
            } 
        }
        setIsValidated(false);
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log(values);
        WalletService.updateWallet(values)
            .then(() => {
                WalletService.getAllWalletsOfUser()
                    .then(res => {
                        let selectedWallet = res.data.filter(item => item.id == wallet.id)[0];
                        setSelectedWallet(selectedWallet);
                        dispatch(walletActions.getWallets(res.data));
                        handleClose();
                    })
            });
    }

    return (
        <Modal show={true} onHide={handleClose} centered>
            <form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>Edit Wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <TextField id="outlined-basic" label="Name" variant="outlined" type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                        />
                        <span className="text-secondary" style={{"font-size": "12px"}}>Wallet name must be unique</span>
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                    <Button variant="contained" color="success" type="submit" disabled={!isValidated}>
                        Save
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}