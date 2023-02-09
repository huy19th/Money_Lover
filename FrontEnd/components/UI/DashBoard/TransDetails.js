import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Col, Row} from "react-bootstrap";

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
        •
    </Box>
);

const card = (
    <React.Fragment>
        <CardContent sx={{width:600}}>
            {/*<div style={{display:'float',alignItem:'left'}}>*/}
            {/*    <h3>Transaction Details</h3>*/}
            {/*</div>*/}
            {/*<div style={{display:'float',alignItem:'right'}}>*/}
            {/*    <Button variant="outlined">Primary</Button>*/}
            {/*    <Button variant="outlined" color="error">Error</Button>*/}
            {/*</div>*/}
            <div>
              <Row>
                  <Col>
                      <h4>Transaction Details</h4>
                  </Col>
                  <Col>
                      <Button variant="outlined" color='success'>Edit</Button>
                      <Button style={{marginLeft:'20px'}} variant="outlined" color="error">Delete</Button>
                  </Col>
              </Row>
            </div>
            <hr/>
            <div>
                <Row>
                    <Col sm={2}>
                        <img style={{width:'70px'}} src="https://static.moneylover.me/img/icon/ic_category_transport.png" alt=""/>
                    </Col>
                    <Col sm={10}>
                        <h3>Transportation</h3>
                        <Row>
                            <Col>
                                <p>Yến đoàn</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Monday, 06/02/2023</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                               <h2>+235235355</h2>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

        </CardContent>
    </React.Fragment>
);

export default function TransDetails() {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}