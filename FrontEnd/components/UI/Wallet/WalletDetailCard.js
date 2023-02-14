import Button from "@mui/material/Button";
import Card from 'react-bootstrap/Card';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Divider, Checkbox } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function WalletDetailCard() {
    const myHandleCLose = () => {
        props.close()
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = () => {

    }

    const handleOver = (event) => {

    }

    return (
        <Card>
            <Card.Header>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <CloseIcon className='ms-3' onClick={myHandleCLose} onMouseOver={(event) => handleOver(event)} />
                        <p className='m-0 ms-3' style={{ fontWeight: "bold", fontSize: '16px' }}>Wallet Details</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Button style={{ color: 'red' }} onClick={handleClickOpen}>Delete</Button>
                        <Button style={{ color: 'green' }} onClick={handleEdit}>Edit</Button>
                    </div>
                </div>
            </Card.Header>
            <Card.Body className="px-0">
                <div className="ms-5 mb-3 d-flex align-items-center">
                    <img src="https://static.moneylover.me/img/icon/icon.png" style={{ height: "56px", width: "56px" }} />
                    <div className="d-inline-flex flex-column ms-3">
                        <h4>Bank Acount</h4>
                        <span className="text-secondary">Việt Nam Đồng</span>
                    </div>
                </div>
                <div className="ms-5 mb-3 d-flex align-items-center">
                    <div className="d-inline-flex flex-column ms-3">
                        <Checkbox {...label} defaultChecked color="success" />
                    </div>
                    <div className="d-inline-flex flex-column ms-3">
                        <span>Excluded from Total</span>
                        <span className="text-secondary" style={{"font-size": "12px"}}>
                            Ignore this wallet and its balance in the "Total" mode.
                        </span>
                    </div>
                    <div>
                        <Checkbox {...label} defaultChecked color="success" />
                    </div>

                </div>
                <Divider />
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default WalletDetailCard;