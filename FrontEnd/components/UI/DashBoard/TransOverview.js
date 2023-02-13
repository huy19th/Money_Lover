import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import Link from "next/link";
import styles from '../../../styles/TransOverview.module.css'
import {useSelector} from "react-redux";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useRef, useState} from "react";
import {Slide, TableContainer} from "@mui/material";
import TranDetail from "@/components/UI/DashBoard/TranDetail";


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

    //

    const [display, setDisplay] = useState(false)
    const [width, setWidth] = useState(0)

    const handleOver = (event) => {
        event.target.classList.add(styles.changePointer)
    }

    const handleClick = () => {
        setDisplay(!display)
        setWidth('100%')
        window.scrollTo(0, 0)
    }

    const containerRef = useRef(null);

    //

    return (
        <TableContainer>
            <Table aria-label="simple table"
                   ref={containerRef}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Card style={{width:'540px',marginTop:'20px', marginRight: "auto", marginLeft: "auto"}}>
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
                                                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: '8px'}} onMouseOver={(event) => handleOver(event)} onClick={handleClick}>
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
                        </TableCell>
                        <Slide in={display} direction="up" mountOnEnter unmountOnExit container={containerRef.current}>
                            <TableCell style={{width: width, verticalAlign: "unset"}}>
                                <TranDetail/>
                            </TableCell>
                        </Slide>
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
    );
}

export default TransOverview;