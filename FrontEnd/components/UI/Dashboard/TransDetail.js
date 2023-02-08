import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import Link from "next/link";


const TransDetails = () => {
    return (
        <Card style={{width:'500px',marginTop:'20px'}}>
            <Card.Header>
                <Nav variant="tabs" defaultActiveKey="#link">
                    <Nav.Item>
                        <Nav.Link href="#first">LAST MONTH</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#link">THIS MONTH</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#disabled" disabled>
                            FUTURE
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body>
                <Container>
                    <Row>
                        <Col>
                            <p>Inflow</p>
                            <p>Outflow</p>
                        </Col>
                        <Col>
                            <p style={{float:'right'}}>+ 111222333333</p>
                            <p style={{float:'right'}}>+ 3333333333</p>
                            <p style={{float:'right'}}>+ 33534555253333</p>
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

export default TransDetails;