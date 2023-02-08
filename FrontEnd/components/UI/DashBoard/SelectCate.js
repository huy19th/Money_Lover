import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import Link from "next/link";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                        width:9
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function AddCate({children}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Select Category
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Select Category
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Card style={{width:'500px',marginTop:'20px'}}>
                        <Card.Header>
                            <Nav variant="tabs" defaultActiveKey="#link">
                                <Nav.Item>
                                    <Nav.Link href="#first">LAST MONTH</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="#link">THIS MONTH</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card.Header>
                        <Card.Body>
                            {/*<Container>*/}
                            {/*    <Row>*/}
                            {/*        <Col>*/}
                            {/*            <p>Inflow</p>*/}
                            {/*            <p>Outflow</p>*/}
                            {/*        </Col>*/}
                            {/*        <Col>*/}
                            {/*            <p style={{float:'right'}}>+ 111222333333</p>*/}
                            {/*            <p style={{float:'right'}}>+ 3333333333</p>*/}
                            {/*            <p style={{float:'right'}}>+ 33534555253333</p>*/}
                            {/*        </Col>*/}
                            {/*        <Link href='#' style={{textAlign:'center',color: '#2db84c',textDecoration:'none'}}>VIEW REPORT FOR THIS PERIOD</Link>*/}
                            {/*    </Row>*/}
                            {/*    <div style={{backgroundColor:'#00000009',margin:'10px'}}>Hello</div>*/}
                            {/*    <Row>*/}
                            {/*        <Col>*/}
                            {/*            <h2>06</h2>*/}
                            {/*        </Col>*/}
                            {/*        <Col>*/}
                            {/*            <p>Monday/February 2023</p>*/}
                            {/*        </Col>*/}
                            {/*        <Col>*/}
                            {/*            <p style={{float:'right'}}>- 3000000000</p>*/}
                            {/*        </Col>*/}
                            {/*    </Row>*/}
                            {/*    <hr/>*/}
                            {/*    <Row>*/}
                            {/*        <Col>*/}
                            {/*            <img style={{width:'60px'}} src="https://static.moneylover.me/img/icon/ic_category_transport.png" alt=""/>*/}
                            {/*        </Col>*/}
                            {/*        <Col>*/}
                            {/*            <p>Transportation</p>*/}
                            {/*        </Col>*/}
                            {/*        <Col>*/}
                            {/*            <p style={{float:'right'}}>- 3000000000 </p>*/}
                            {/*        </Col>*/}
                            {/*    </Row>*/}
                            {/*</Container>*/}
                            {children}
                        </Card.Body>

                    </Card>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}