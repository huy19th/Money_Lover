import React from 'react';
import Button from 'react-bootstrap/Button';
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from 'mdb-react-ui-kit';
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

function Register() {
    return (<MDBContainer fluid>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            <MDBCol style={{backgroundColor:'lightgray',height:"100vh"}} col='12'>
                <div style={{backgroundColor: '#00710f', height: '350px', position:"absolute",width:"100%"}}><img style={{width:'300px',marginLeft:'550px',marginTop:'25px'}} src="https://f27-zpc.zdn.vn/478914099736103095/426f0e7760c9bb97e2d8.jpg" alt=""/>
                </div>
                <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '700px',position:"relative",top:"160px"}}>
                    <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                        <MDBRow>
                            <h2 className="fw-bold mb-2 text-center">Register</h2>

                            <MDBCol style={{marginTop: '40px'}}>
                                <p>Using social networking accounts</p>

                                <Button style={{borderWidth:'2px'}} variant='outline-danger' className="mb-2 w-100 d-flex align-items-center" size="lg" >
                                    <FaGoogle style={{marginRight: '19px'}}/>
                                    Connect with google
                                </Button>

                                <Button style={{borderWidth:'2px'}} variant='outline-primary' className="mb-4 w-100 d-flex align-items-center" size="lg">
                                    <FaFacebook style={{marginRight: '19px'}}/>
                                    Connect with facebook
                                </Button>
                            </MDBCol>
                            <MDBCol>
                                <p className="text-white-50 mb-3">Please enter your login and password!</p>
                                <p>Using Money Lover account</p>
                                <MDBInput wrapperClass='mb-4 w-100' placeholder='Email' id='formControlLg'
                                          type='email' size="lg"/>
                                <MDBInput wrapperClass='mb-4 w-100' placeholder="Password" id='formControlLg'
                                          type='password' size="lg"/>
                                <Link style={{textAlign: 'center', textDecoration: 'none'}}
                                      href="#">Forgot password?</Link>
                                <br/>
                                <Button style={{marginTop:'20px',width:'300px'}} variant="success" size='lg'>
                                    Register
                                </Button>
                                <br/>
                                <p style={{textAlign: 'center', textDecoration: 'none', marginTop: '10px'}}>Have you an account? <Link href="/login"> Sign in</Link></p>

                                <hr className="my-3"/>
                            </MDBCol>

                        </MDBRow>

                    </MDBCardBody>
                </MDBCard>

            </MDBCol>
        </MDBRow>

    </MDBContainer>);
}

export default Register;