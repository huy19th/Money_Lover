import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AddTransactionForm from "@/components/UI/Dashboard/AddTransaction/AddTransactionForm";
import {axiosJWT} from "@/configs/axios";
import { useDispatch, useSelector } from "react-redux";

function ControlledTabs({ handleCLose }) {
    const [key, setKey] = useState('expense');

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.currentUser)
    const [cates, setCates] = useState([])

    useEffect(() => {
        axiosJWT.get('http://localhost:8000/api/type')
            .then(res => {
                setCates(res.data)
            })
    }, [])

    if (cates.length !== 0) {
        return (
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
                justify
            >
                <Tab eventKey="expense" title="Expense">
                    <AddTransactionForm handleClose={handleCLose} data={cates[0]} />
                </Tab>
                <Tab eventKey="income" title="Income">
                    <AddTransactionForm handleClose={handleCLose} data={cates[1]} />
                </Tab>
            </Tabs>
        );
    } else {
        return <p>Loading...</p>
    }
}

export default function AddTransactionModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Transaction
            </Button>

            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title>Add Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ControlledTabs handleCLose={handleClose} />
                </Modal.Body>
            </Modal>
        </>
    );
}
