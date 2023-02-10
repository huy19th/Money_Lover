import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import Link from "next/link";
import {useSelector} from "react-redux";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';


const TransOverview = () => {

    // Add Transaction

    const myWallet = useSelector(state => state.wallet.currentWallet)
    const myTrans = useSelector(state => state.transaction)

    let trans = []

    myTrans.map(transaction => {
        if (transaction.wallet_name === myWallet.name && new Date(transaction.date).getMonth()+1 === new Date().getMonth()+1 && new Date(transaction.date).getFullYear() === new Date().getFullYear() ) {
            trans.push(transaction)
        }
    })

    let inflow = 0;
    let outflow = 0;
    trans.map(tran => {
        if (tran.type_name === 'Expenese') {
            outflow += tran.money
        } else {
            inflow += tran.money
        }
    })

    let newBalance = myWallet.balance+inflow-outflow

    inflow = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(inflow)
    outflow = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(outflow)
    newBalance = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(newBalance)

    //

    return (
        <Card style={{width:'540px',marginTop:'20px'}}>
            <Card.Header>
                <Nav variant="tabs" defaultActiveKey="#link" style={{width: '100%'}}>
                    <div style={{width: 'calc(100% / 3)', textAlign: "center"}}>
                        <Nav.Link href="#first">LAST MONTH</Nav.Link>
                    </div>
                    <div style={{width: 'calc(100% / 3)', textAlign: "center"}}>
                        <Nav.Link href="#link">THIS MONTH</Nav.Link>
                    </div>
                    <div style={{width: 'calc(100% / 3)', textAlign: "center"}}>
                        <Nav.Link href="#disabled" disabled>
                            FUTURE
                        </Nav.Link>
                    </div>
                </Nav>
            </Card.Header>
            <Card.Body>
                <Container style={{padding:'0px'}}>
                    <Row style={{padding:'10px'}}>
                        <Col>
                            <p>Inflow</p>
                            <p>Outflow</p>
                        </Col>
                        <Col>
                            <p style={{color:'blue',marginLeft:'124px'}}>+ {inflow}</p>
                            <p style={{color:'red',marginLeft:'124px'}}>- {outflow}</p>
                            <hr/>
                            <p style={{marginLeft:'124px'}}>{newBalance}</p>
                        </Col>
                        <Link href='#' style={{textAlign:'center',color: '#2db84c',textDecoration:'none'}}>VIEW REPORT FOR THIS PERIOD</Link>
                    </Row>
                    <hr/>
                    {trans.map(tran => {
                        return (
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: '8px'}}>
                                <div>
                                    <p style={{fontWeight: "bold", marginBottom: 0}}>{tran.subCate_name}</p>
                                    <p style={{opacity: 0.7, marginBottom: 0}}>{tran.note}</p>
                                </div>
                                {tran.type_name === 'Expenese' ? (
                                    <div style={{color: 'red'}}>-{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tran.money)}</div>
                                ) : (
                                    <div style={{color: "dodgerblue"}}>+{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tran.money)}</div>
                                )}
                            </div>
                        )
                    })}
                </Container>
            </Card.Body>
        </Card>
    );
}

export default TransOverview;