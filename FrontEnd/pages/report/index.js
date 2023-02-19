import Report from "@/components/UI/Report";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import MyBackDrop from "@/components/shares/BackDrop";
import {axiosJWT} from "@/configs/axios";
import {transactionActions} from "@/features/transaction/transactionSlice";
import moment from "moment";

export default function UserReport() {

    const dispacth = useDispatch()

    const [child, setChild] = useState(<MyBackDrop/>)

    const myWallet = useSelector(state => state.wallet.currentWallet)

    useEffect(() => {
        axiosJWT.get(`/transaction/${myWallet.id}`, {
            params: {
                year: moment().format('MM/YYYY').split('/')[1],
                month: moment().format('MM/YYYY').split('/')[0]
            }
        })
            .then((res) => {
                dispacth(transactionActions.getTrans(res.data))
                setChild(<Report/>)
            })
    }, [])

    return (
        <>
            {child}
        </>
    )
}