import {useEffect, useState} from "react";
import axios from 'axios';
import {authActions} from "@/features/auth/authSlice";
import {useDispatch} from "react-redux";
import MyBackDrop from "@/components/shares/BackDrop";
import MyHome from "@/components/UI/Home";

export default function Home() {
    const [child, setChild] = useState(<MyBackDrop/>)
    const dispatch = useDispatch()
    // useEffect(() => {
    //     const getUser = () => {
    //         axios.get('http://localhost:8000/auth/login/success', {
    //             withCredentials: true,
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //                 "Access-Control-Allow-Credentials": true
    //             }
    //         }).then((resObject) => {
    //             localStorage.setItem('token', resObject.data.accessToken)
    //             dispatch(authActions.loggedIn(resObject.data.refreshToken))
    //             setChild(<MyHome/>)
    //         }).catch(err => {
    //             console.log(err)
    //         })
    //     }
    //     getUser();
    // }, [])

    return (
        <>
            {/*{child}*/}
            <MyHome/>
        </>
    )
}

