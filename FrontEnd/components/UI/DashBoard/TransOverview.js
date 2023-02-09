import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import Link from "next/link";
import {useSelector} from "react-redux";


const TransOverview = () => {

    // Test

    const myWallet = useSelector(state => state.wallet.currentWallet)
    const myTrans = useSelector(state => state.transaction)

    let trans = []

    myTrans.map(transaction => {
        if (transaction.wallet_name === myWallet.name && new Date(transaction.date).getMonth()+1 === new Date().getMonth()+1 && new Date(transaction.date).getFullYear() === new Date().getFullYear() ) {
            trans.push(transaction)
        }
    })

    console.log(trans)

    let inflow = 0;
    let outflow = 0;
    trans.map(tran => {
        if (tran.type_name === 'Expenese') {
            outflow += tran.money
        } else {
            inflow += tran.money
        }
    })

    inflow = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(inflow)
    outflow = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(outflow)

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
                <Container>
                    <Row>
                        <Col className='col-md-9'>
                            <p>Inflow</p>
                            <p>Outflow</p>
                        </Col>
                        <Col>
                            <p style={{color: 'dodgerblue'}}>+{inflow}</p>
                            <p style={{color: "red"}}>-{outflow}</p>
                        </Col>
                        <Link href='#' style={{textAlign:'center',color: '#2db84c',textDecoration:'none'}}>VIEW REPORT FOR THIS PERIOD</Link>
                    </Row>
                    <div style={{backgroundColor:'#00000009',margin:'10px'}}>Hello</div>
                    <Row>
                        <Col>
                            <h2>06</h2>
                        </Col>
                        <Col>
                            <p>Monday/February 2023</p>
                        </Col>
                        <Col>
                            <p style={{float:'right'}}>- 3000000000</p>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            <img style={{width:'60px'}} src="https://static.moneylover.me/img/icon/ic_category_transport.png" alt=""/>
                        </Col>
                        <Col>
                            <p>Transportation</p>
                        </Col>
                        <Col>
                            <p style={{float:'right'}}>- 3000000000 </p>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
}

export default TransOverview;