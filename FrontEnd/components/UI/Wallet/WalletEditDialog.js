import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Checkbox } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function WalletEditDialog({ data, wallet, setShow }) {
    const handleClose = () => setShow(false);

    const [values, setValues] = useState({
        walletId: wallet.id,
        name: wallet.name,
        initialBlance: wallet.initialBlance,
        includeTotal: wallet.include_total,
        active: wallet.active
    });

    const handleChange = event => {
        let selectedWallet = data.filter(item => item.id == values.walletId)[0];
        if (event.target.name == "walletId") {
            selectedWallet = data.filter(item => item.id == event.target.value)[0];
            setValues({ ...selectedWallet });
        }
        else {
            setValues({
                ...values,
                [event.target.name]: event.target.value
            })
        }
    }
    console.log(wallet)

    return (
        <Modal show={true} onHide={handleClose} centered>
            <form>
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
                            value={values.initialBlance}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <hr/>
                    <div className="mb-3 d-flex align-items-center">
                        <Checkbox {...label} checked={!values.includeTotal} color="success"/>
                        <div className="d-inline-flex flex-column ms-3">
                            <span>Excluded from Total</span>
                            <span className="text-secondary" style={{ "font-size": "12px" }}>
                                Include this wallet and its balance in the "Total" mode.
                            </span>
                        </div>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                        <Checkbox {...label} checked={!values.active} color="success"/>
                        <div className="d-inline-flex flex-column ms-3">
                            <span>Archived</span>
                            <span className="text-secondary" style={{ "font-size": "12px" }}>
                                Freeze this wallet and stop generating bills & recurring transactions.
                            </span>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}