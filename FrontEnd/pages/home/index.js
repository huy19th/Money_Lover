import {useEffect, useState} from "react";
import axios from 'axios';
import {authActions} from "@/features/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import MyBackDrop from "@/components/shares/BackDrop";
import MyHome from "@/components/UI/Home";
import {useRouter} from "next/router";
import {walletActions} from "@/features/wallet/walletSlice";
import {transactionActions} from "@/features/transaction/transactionSlice";
import jwt_decode from "jwt-decode";

export default function Home(props) {

    const router = useRouter()

    const user = useSelector(state => state.auth);

    const [child, setChild] = useState(<MyBackDrop/>)

    const dispatch = useDispatch()

    const refreshToken = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/auth/refresh', {token: user.refreshToken});
            localStorage.setItem('token', res.data.accessToken)
            let user = jwt_decode(res.data.accessToken)
            dispatch(authActions.loggedIn({
                user: user,
                refreshToken: res.data.refreshToken
            }))
            return res.data
        } catch (err) {
            console.log(err)
        }
    }
    // RefreshToken
    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(
        async (config) => {
            let currentDate = new Date();
            const decodedToken = jwt_decode(localStorage.getItem('token'))
            if (decodedToken.exp*1000 < currentDate.getTime()) {
                const data = await refreshToken();
                config.headers['authorization'] = "Bearer " + data.accessToken
            } else {
                config.headers['authorization'] = "Bearer " + localStorage.getItem('token')
            }
            return config
        }, (err) => {
            return Promise.reject(err)
        }
    )

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
            axiosJWT.get(`http://localhost:8000/api/user/info`)
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

