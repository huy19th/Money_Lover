import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import SideNavBar from "@/components/shares/SideBar";
import Button from "react-bootstrap/Button";
import {BsCalendarDay} from "react-icons/bs";
import {FaEye, RiFindReplaceLine} from "react-icons/all";
import {Card, Col, Row} from "react-bootstrap";



const Layout=({children})=>{
    return(
        <div style={{backgroundColor:'lightgray',height:'740px'}}>
            <Navbar style={{backgroundColor:'white',height:'70px'}} bg="" expand="lg">
                <Container>
                    <img style={{width:'50px',marginLeft:'20px'}} src="https://static.moneylover.me/img/icon/ic_category_all.png" alt=""/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Total" id="basic-nav-dropdown">
                                <Card style={{width:'300px',height:"500px"}}>
                                    <Card.Header as="h5">Select Wallet</Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <Col md={4}>
                                                <img style={{width:'50px',marginLeft:'20px'}} src="https://static.moneylover.me/img/icon/ic_category_all.png" alt=""/>
                                            </Col>
                                            <Col md={8 }>
                                                Total
                                                <p>55252535</p>
                                            </Col>
                                        </Row>
                                        <hr/>
                                        <p>Included in total</p>
                                        <hr/>
                                        <Row>
                                            <Col md={4}>
                                                <img style={{width:'50px',marginLeft:'20px'}} src="https://static.moneylover.me/img/icon/icon.png" alt=""/>
                                            </Col>
                                            <Col md={8 }>
                                                Yến Đoàn
                                                <p>55252535</p>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    <BsCalendarDay style={{width:'50px',height:'30px',marginLeft:'100px'}}/>
                    <RiFindReplaceLine style={{width:'100px',height:'30px'}}/>
                    <Button variant="success">ADD TRANSACTION</Button>
                </Container>
            </Navbar>
            <SideNavBar/>
            {children}
        </div>
    )
}
export default Layout