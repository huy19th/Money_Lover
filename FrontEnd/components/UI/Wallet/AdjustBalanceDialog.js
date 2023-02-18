import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CancelButton from '@/components/shares/CancelButton';
import WalletService from '@/services/wallet.service';
import { useDispatch, useSelector } from 'react-redux';
import { walletActions } from '@/features/wallet/walletSlice';
import MaskedTextField from '@/components/shares/MaskedTextField';

export default function AdjustBalanceDialog({ setShow, data, wallet, setSelectedWallet }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth).currentUser;
    const [values, setValues] = useState({
        walletId: wallet.id,
        balance: wallet.balance,
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

    const handleSubmit = event => {
        event.preventDefault();
        WalletService.adjustBalance(values)
            .then(res => {
                console.log(res);
                WalletService.getAllWalletsOfUser(user.id)
                    .then(res => {
                        let selectedWallet = res.data.filter(item => item.id == wallet.id)[0];
                        setSelectedWallet(selectedWallet);
                        dispatch(walletActions.getWallets(res.data));
                    })
                handleClose();
            })
    }

    return (
        <Dialog onClose={handleClose} open={true}>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Ajust Balance</DialogTitle>
                <hr className="my-0" />
                <DialogContent>
                    <FormControl fullWidth sx={{ my: 3 }}>
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
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <MaskedTextField label="Current balance" variant="outlined" type="number"
                            name="balance"
                            value={values.balance}
                            onChange={handleChange}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions sx={{ mr: 3, my: 1 }}>
                    <CancelButton onClick={handleClose} text="Cancel" />
                    <Button variant="contained" color="success" sx={{ ml: 2 }} type="submit" disabled={!isValidated}>
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}