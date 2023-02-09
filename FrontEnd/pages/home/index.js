import {useEffect, useState} from "react";
import axios from 'axios';
import {authActions} from "@/features/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import MyBackDrop from "@/components/shares/BackDrop";
import MyHome from "@/components/UI/Home";
import {useRouter} from "next/router";
import {walletActions} from "@/features/wallet/walletSlice";
import {transactionActions} from "@/features/transaction/transactionSlice";

export default function Home() {

    const router = useRouter()

    const user = useSelector(state => state.auth);

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

    useEffect(() => {
        if (user.isLoggedIn) {
            axios.get(`http://localhost:8000/tester/${user.currentUser.id}`)
                .then(res => {
                    dispatch(walletActions.getWallets(res.data.wallets))
                    dispatch(transactionActions.getTrans(res.data.trans))
                    setChild(<MyHome/>)
                })
        } else {
            router.push('/login')
        }
    }, [])

    return (
        <>
            {child}
        </>
    )
}

