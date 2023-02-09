import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import Link from "next/link";
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
    return (
        <Card style={{width:'600px',marginTop:'20px'}}>
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
                <Container style={{padding:'0px'}}>
                    <Row style={{padding:'10px'}}>
                        <Col>
                            <p>Inflow</p>
                            <p>Outflow</p>
                        </Col>
                        <Col>
                            <p style={{color:'blue',marginLeft:'100px'}}>+ 111222333333</p>
                            <p style={{color:'red',marginLeft:'100px'}}>- 38333333333</p>
                            <hr/>
                            <p style={{marginLeft:'100px'}}>+ 33534555253333</p>
                        </Col>
                        <Link href='#' style={{textAlign:'center',color: '#2db84c',textDecoration:'none'}}>VIEW REPORT FOR THIS PERIOD</Link>
                    </Row>
                    <hr/>
                    <Row>
                        <Col sm={2}>
                            <img style={{width:'60px'}} src="https://static.moneylover.me/img/icon/ic_category_transport.png" alt=""/>
                        </Col>
                        <Col>
                            <p>Transportation</p>
                        </Col>
                        <Col>
                            <p style={{float:'right'}}>- 3000000000 </p>
                        </Col>
                    </Row>
                    <Paper sx={{ width: 600, maxWidth: '100%',padding:'0px' }}>
                        <MenuList>
                            <MenuItem>
                                <ListItemIcon >
                                    <h1>06</h1>
                                </ListItemIcon>
                                <ListItemText style={{marginLeft:'10px'}}>Monday,February 2023</ListItemText>
                                <Typography variant="body1" color="text.secondary">
                                    -242325525
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon >
                                    <h1>07</h1>
                                </ListItemIcon>
                                <ListItemText style={{marginLeft:'10px'}}>Monday,February 2023</ListItemText>
                                <Typography variant="body1" color="text.secondary">
                                    +2423234355525
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon >
                                    <h1>07</h1>
                                </ListItemIcon>
                                <ListItemText style={{marginLeft:'10px'}}>Monday,February 2023</ListItemText>
                                <Typography variant="body1" color="text.secondary">
                                    -24232453535525
                                </Typography>
                            </MenuItem>
                            <Divider />
                        </MenuList>
                    </Paper>
                    <hr/>
                    <Row>
                        <Col sm={2}>
                            <img style={{width:'60px'}} src="https://static.moneylover.me/img/icon/ic_category_transport.png" alt=""/>
                        </Col>
                        <Col>
                            <p>Transportation</p>
                        </Col>
                        <Col>
                            <p style={{float:'right'}}>- 3000000000 </p>
                        </Col>
                    </Row>
                    <Paper sx={{ width: 600, maxWidth: '100%',padding:'0px' }}>
                        <MenuList>
                            <MenuItem>
                                <ListItemIcon >
                                    <h1>06</h1>
                                </ListItemIcon>
                                <ListItemText style={{marginLeft:'10px'}}>Monday,February 2023</ListItemText>
                                <Typography variant="body1" color="text.secondary">
                                    -242325525
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon >
                                    <h1>07</h1>
                                </ListItemIcon>
                                <ListItemText style={{marginLeft:'10px'}}>Monday,February 2023</ListItemText>
                                <Typography variant="body1" color="text.secondary">
                                    +2423234355525
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon >
                                    <h1>07</h1>
                                </ListItemIcon>
                                <ListItemText style={{marginLeft:'10px'}}>Monday,February 2023</ListItemText>
                                <Typography variant="body1" color="text.secondary">
                                    -24232453535525
                                </Typography>
                            </MenuItem>
                            <Divider />
                        </MenuList>
                    </Paper>
                    <hr/>
                    <Row>
                        <Col sm={2}>
                            <img style={{width:'60px'}} src="https://static.moneylover.me/img/icon/ic_category_transport.png" alt=""/>
                        </Col>
                        <Col>
                            <p>Transportation</p>
                        </Col>
                        <Col>
                            <p style={{float:'right'}}>- 3000000000 </p>
                        </Col>
                    </Row>
                    <Paper sx={{ width: 600, maxWidth: '100%',padding:'0px' }}>
                        <MenuList>
                            <MenuItem>
                                <ListItemIcon >
                                    <h1>06</h1>
                                </ListItemIcon>
                                <ListItemText style={{marginLeft:'10px'}}>Monday,February 2023</ListItemText>
                                <Typography variant="body1" color="text.secondary">
                                    -242325525
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon >
                                    <h1>07</h1>
                                </ListItemIcon>
                                <ListItemText style={{marginLeft:'10px'}}>Monday,February 2023</ListItemText>
                                <Typography variant="body1" color="text.secondary">
                                    +2423234355525
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon >
                                    <h1>07</h1>
                                </ListItemIcon>
                                <ListItemText style={{marginLeft:'10px'}}>Monday,February 2023</ListItemText>
                                <Typography variant="body1" color="text.secondary">
                                    -24232453535525
                                </Typography>
                            </MenuItem>
                            <Divider />
                        </MenuList>
                    </Paper>
                </Container>
            </Card.Body>

        </Card>
    );
}

export default TransOverview;