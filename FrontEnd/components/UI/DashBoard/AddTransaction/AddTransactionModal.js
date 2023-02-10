import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AddTransactionForm from "@/components/UI/Dashboard/AddTransaction/AddTransactionForm";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {authActions} from "@/features/auth/authSlice";
import {useDispatch} from "react-redux";

function ControlledTabs({handleCLose}) {
    const [key, setKey] = useState('expense');

    const dispatch = useDispatch()

    const [cates, setCates] = useState([])

    const refreshToken = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/auth/refresh', {token: user.refreshToken});
            localStorage.setItem('token', res.data.accessToken)
            let user = jwt_decode(res.data.accessToken)
            dispatch(authActions.loggedIn({
                user: user,
                refreshToken: res.data.refreshToken
            }))
            return res.data
        } catch (err) {
            console.log(err)
        }
    }
    // RefreshToken
    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(
        async (config) => {
            let currentDate = new Date();
            const decodedToken = jwt_decode(localStorage.getItem('token'))
            if (decodedToken.exp*1000 < currentDate.getTime()) {
                const data = await refreshToken();
                config.headers['authorization'] = "Bearer " + data.accessToken
            } else {
                config.headers['authorization'] = "Bearer " + localStorage.getItem('token')
            }
            return config
        }, (err) => {
            return Promise.reject(err)
        }
    )

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
                    <AddTransactionForm handleClose={handleCLose} data={cates[0]}/>
                </Tab>
                <Tab eventKey="income" title="Income">
                    <AddTransactionForm handleClose={handleCLose} data={cates[1]}/>
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
                    <ControlledTabs handleCLose={handleClose}/>
                </Modal.Body>
            </Modal>
        </>
    );
}
