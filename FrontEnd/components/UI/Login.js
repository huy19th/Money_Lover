import React from 'react';
import Button from 'react-bootstrap/Button';
import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow} from 'mdb-react-ui-kit';
import Link from "next/link";
import {FaFacebook, FaGoogle} from "react-icons/fa";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Logo from "@/components/shares/Logo";
import axios from 'axios';
import useRouter from 'next/router'

const Login = () => {

    const router = useRouter

    const google = () => {
        window.open('http://localhost:8000/auth/google', '_self')
    }

    const formik = useFormik({
        initialValues: {
            email: '', password: ''
        }, validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .required('Password is required'),
        }), onSubmit: values => {
            axios.post('http://localhost:8000/auth/login', values)
                .then((res) => {
                    localStorage.setItem('token', res.data.accessToken)
                    router.push('/home')
                })
        }
    })
    return (<MDBContainer style={{height:'100%',backgroundColor:'lightgray'}} fluid>
        <MDBRow className='d-flex justify-content-center align-items-center'>
            <MDBCol style={{backgroundColor: 'lightgray', height: "100vh"}} col='12'>
                <div style={{backgroundColor: '#00710f', height: '350px', width: "100%"}}>
                    <Logo/>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <MDBCard className='bg-white mx-auto'
                             style={{borderRadius: '1rem', maxWidth: '700px',zIndex:999, top: "-120px"}}>
                        <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                            <MDBRow>
                                <h2 className="fw-bold mb-2 text-center">Log In</h2>

                                <MDBCol style={{marginTop: '40px'}}>
                                    <p>Using social networking accounts</p>

                                    <Button style={{borderWidth: '2px'}} variant='outline-danger' onClick={google}
                                            className="mb-2 w-100 d-flex align-items-center" size="lg">
                                        <FaGoogle style={{marginRight: '19px'}}/>
                                        Connect with google
                                    </Button>

                                    <Button style={{borderWidth: '2px'}} variant='outline-primary'
                                            className="mb-4 w-100 d-flex align-items-center" size="lg">
                                        <FaFacebook style={{marginRight: '19px'}}/>
                                        Connect with facebook
                                    </Button>
                                </MDBCol>
                                <MDBCol>
                                    <p className="text-white-50 mb-3">Please enter your login and password!</p>
                                    <p>Using Money Lover account</p>
                                    <MDBInput wrapperClass='mb-2 w-100' placeholder='Email' id='email'
                                              type='email' name='email' onChange={formik.handleChange}
                                              value={formik.values.email} size="lg"/>
                                    {formik.errors.email && formik.touched.email && (<p style={{color:'red'}}>{formik.errors.email}</p>)}
                                    <MDBInput wrapperClass='mb-2 w-100' placeholder="Password" id='password'
                                              type='password' name='password' onChange={formik.handleChange}
                                              value={formik.values.password} size="lg"/>
                                    {formik.errors.password && formik.touched.password && (
                                        <p style={{color:'red'}}>{formik.errors.password}</p>)}
                                    <Link style={{textAlign: 'center', textDecoration: 'none'}}
                                          href="#">Forgot password?</Link>
                                    <br/>
                                    <Button type='submit' style={{marginTop: '20px', width: '300px'}} variant="success" size='lg'>
                                        Log In
                                    </Button>
                                    <br/>
                                    <p style={{textAlign: 'center', textDecoration: 'none', marginTop: '10px'}}>Have you
                                        an
                                        account? <Link href="/register"> Register</Link></p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </form>
            </MDBCol>
        </MDBRow>
    </MDBContainer>);
}
export default Login;

