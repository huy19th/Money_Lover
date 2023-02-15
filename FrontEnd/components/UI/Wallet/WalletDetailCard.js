import Button from "@mui/material/Button";
import Card from 'react-bootstrap/Card';
import CloseIcon from '@mui/icons-material/Close';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { Divider, Checkbox } from '@mui/material';
import WalletService from "@/services/wallet.service";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function WalletDetailCard({wallet, setShowDetail, setShowEdit, setShowBalance}) {
    const {name, balance, includeTotal, active} = wallet;
    
    const handleClose = () => {
        setShowDetail(false);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const showEdit = () => {
        setShowEdit(true);
    }

    return (
        <Col xs={7}>
            <Card>
                <Card.Header>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <CloseIcon className='ms-3' onClick={handleClose} />
                            <h5 className='m-0 ms-3'>Wallet Details</h5>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Button color="error" onClick={handleClickOpen}>Delete</Button>
                            <Button color="success" onClick={showEdit}>Edit</Button>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body className="px-0">
                    <div className="ms-5 mb-3 d-flex align-items-center">
                        <img src="https://static.moneylover.me/img/icon/icon.png" style={{ height: "56px", width: "56px" }} />
                        <div className="d-inline-flex flex-column ms-3">
                            <h4>{name}</h4>
                            <span className="text-secondary">{WalletService.formatMoney(balance)}</span>
                        </div>
                    </div>
                    <hr/>
                    <div className="ms-5 mb-3 d-flex align-items-center">
                        <Checkbox {...label} checked={!includeTotal} color="success" disabled={true} />
                        <div className="d-inline-flex flex-column ms-3">
                            <span>Excluded from Total</span>
                            <span className="text-secondary" style={{ "font-size": "12px" }}>
                                Include this wallet and its balance in the "Total" mode.
                            </span>
                        </div>
                    </div>
                    <div className="ms-5 mb-3 d-flex align-items-center">
                        <Checkbox {...label} checked={!active} color="success" disabled={true} />
                        <div className="d-inline-flex flex-column ms-3">
                            <span>Archived</span>
                            <span className="text-secondary" style={{ "font-size": "12px" }}>
                                Freeze this wallet and stop generating bills & recurring transactions.
                            </span>
                        </div>
                    </div>

                    <Divider />
                </Card.Body>
                <Card.Footer className="d-flex justify-content-center p-0 m-0"
                    onClick={setShowBalance}
                >
                    <Button color="success" fullWidth>Adjust Balance</Button>
                </Card.Footer>
            </Card >
        </Col>
    );
}

export default WalletDetailCard;