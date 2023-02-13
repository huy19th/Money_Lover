import {useEffect, useState} from "react";
import {axiosJWT} from "@/configs/axios";
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

    useEffect(() => {
        if (user.isLoggedIn) {
            axiosJWT.get(`/user/info`)
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

