import Button from "@mui/material/Button";
import Card from 'react-bootstrap/Card';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

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
        event.target.classList.add(styles.changePointer)
    }

    return (
        <Card>
            <Card.Header>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <CloseIcon className='ms-2' onClick={myHandleCLose} onMouseOver={(event) => handleOver(event)} />
                        <p className='m-0 ms-3' style={{ fontWeight: "bold", fontSize: '16px' }}>Wallet Details</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Button style={{ color: 'red' }} onClick={handleClickOpen}>Delete</Button>
                        <Button style={{ color: 'green' }} onClick={handleEdit}>Edit</Button>
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <hr/>
                <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default WalletDetailCard;