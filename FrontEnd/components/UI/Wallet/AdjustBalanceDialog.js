import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function AdjustBalanceDialog({ setShow, data, selectedItem }) {

    const handleClose = () => setShow(false);

    const formik = useFormik({
        initialValues: {
            walletId: selectedItem.id,
            balance: selectedItem.balance,
        },
        validationSchema: Yup.object({
            walletId: Yup.number().required('Please select wallet'),
            balance: Yup.number().required('Please insert balance')
        }),
        onSubmit: values => {
            console.log(values)
        },
    });

    return (
        <>
            <Modal show={true} onHide={handleClose} centered>
                <form onSubmit={formik.handleSubmit}>
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
                                // value={selectedItem.id}
                                {...formik.getFieldProps('walletId')}
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
                                {...formik.getFieldProps('balance')}
                            />
                        </FormControl>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}