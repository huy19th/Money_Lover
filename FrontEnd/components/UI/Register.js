import React from 'react';
import Button from 'react-bootstrap/Button';
import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow} from 'mdb-react-ui-kit';
import Link from "next/link";
import {FaFacebook, FaGoogle} from "react-icons/fa";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Logo from "@/components/shares/Logo";
import axios from "axios";
import {useRouter} from "next/router";
import MyGoogleButton from "@/components/shares/GoogleButton";

const Register = () => {

    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            name: '', email: '', password: ''
        }, validationSchema: Yup.object({
            name: Yup.string()
                .min(8, 'Name must be at least 8 characters')
                .required('Name is required'), email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'), password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .required('Password is required'),
        }), onSubmit: async (values) => {
            await axios.post('http://localhost:8000/api/auth/register', values)
            router.push('/login')
        }
    })
    return (<MDBContainer style={{height: '100%', backgroundColor: 'lightgray'}} fluid>
        <MDBRow className='d-flex justify-content-center align-items-center'>
            <MDBCol style={{backgroundColor: 'lightgray', height: "100vh"}} col='12'>
                <div style={{backgroundColor: '#00710f', height: '350px', width: "100%"}}>
                    <Logo/>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <MDBCard className='bg-white mx-auto'
                             style={{borderRadius: '1rem', maxWidth: '700px', zIndex: 999, top: "-120px"}}>
                        <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                            <MDBRow>
                                <h2 className="fw-bold mb-2 text-center">Register</h2>

                                <MDBCol style={{marginTop: '40px'}}>
                                    <p>Using social networking accounts</p>

                                    <MyGoogleButton/>

                                    <Button style={{borderWidth: '2px'}} variant='outline-primary'
                                            className="mb-4 w-100 d-flex align-items-center" size="lg">
                                        <FaFacebook style={{marginRight: '19px'}}/>
                                        Connect with facebook
                                    </Button>
                                </MDBCol>
                                <MDBCol>
                                    <p className="text-white-50 mb-3">Please enter your login and password!</p>
                                    <p>Using Money Lover account</p>
                                    <MDBInput wrapperClass='mb-2 w-100' placeholder='Name' id='name'
                                              type='text' name='name' onChange={formik.handleChange}
                                              value={formik.values.name} size="lg"/>
                                    {formik.errors.name && formik.touched.name && (
                                        <p style={{color: 'red'}}>{formik.errors.name}</p>)}
                                    <MDBInput wrapperClass='mb-2 w-100' placeholder='Email' id='email'
                                              type='email' name='email' onChange={formik.handleChange}
                                              value={formik.values.email} size="lg"/>
                                    {formik.errors.email && formik.touched.email && (
                                        <p style={{color: 'red'}}>{formik.errors.email}</p>)}
                                    <MDBInput wrapperClass='mb-2 w-100' placeholder="Password" id='password'
                                              type='password' name='password' onChange={formik.handleChange}
                                              value={formik.values.password} size="lg"/>
                                    {formik.errors.password && formik.touched.password && (
                                        <p style={{color: 'red'}}>{formik.errors.password}</p>)}
                                    <br/>
                                    <Button type='submit' style={{marginTop: '20px', width: '300px'}} variant="success"
                                            size='lg'>
                                        Register
                                    </Button>
                                    <br/>
                                    <p style={{textAlign: 'center', textDecoration: 'none', marginTop: '10px'}}>Have you
                                        an account? <Link href="/login"> Log In</Link></p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </form>
            </MDBCol>
        </MDBRow>
    </MDBContainer>);
}

export default Register;