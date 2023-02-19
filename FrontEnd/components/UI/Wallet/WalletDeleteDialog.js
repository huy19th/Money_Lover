import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';

export function WalletDeleteDialog({ setShow, wallet }) {

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Do you want to delete {wallet.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You will also delete all of its transactions, budgets, events, bills and this action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="text" color="success" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="contained" color="error" onClick={handleDelete}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}