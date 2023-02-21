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
        async function fetchData() {
            if (myWallet.id !== 'Total') {
                let transactions = (await axiosJWT.get(`/transaction/${myWallet.id}`, {
                    params: {
                        year: moment().format('MM/YYYY').split('/')[1],
                        month: moment().format('MM/YYYY').split('/')[0]
                    }
                })).data
                let incomeTransactions = (await axiosJWT.get(`/transaction/${myWallet.id}/detail`, {
                    params: {
                        year: moment().format('MM/YYYY').split('/')[1],
                        month: moment().format('MM/YYYY').split('/')[0],
                        typeName: 'Income'
                    }
                })).data
                let expenseTransactions = (await axiosJWT.get(`/transaction/${myWallet.id}/detail`, {
                    params: {
                        year: moment().format('MM/YYYY').split('/')[1],
                        month: moment().format('MM/YYYY').split('/')[0],
                        typeName: 'Expenese'
                    }
                })).data
                dispacth(transactionActions.getTrans(transactions))
                dispacth(transactionActions.getIncomeTrans(incomeTransactions))
                dispacth(transactionActions.getExpenseTrans(expenseTransactions))
                setChild(<Report/>)
            } else {
                let transactions = (await axiosJWT.get(`/transaction`, {
                    params: {
                        year: moment().format('MM/YYYY').split('/')[1],
                        month: moment().format('MM/YYYY').split('/')[0]
                    }
                })).data
                let incomeTransactions = (await axiosJWT.get(`/transaction/type`, {
                    params: {
                        year: moment().format('MM/YYYY').split('/')[1],
                        month: moment().format('MM/YYYY').split('/')[0],
                        typeName: 'Income'
                    }
                })).data
                let expenseTransactions = (await axiosJWT.get(`/transaction/type`, {
                    params: {
                        year: moment().format('MM/YYYY').split('/')[1],
                        month: moment().format('MM/YYYY').split('/')[0],
                        typeName: 'Expenese'
                    }
                })).data
                dispacth(transactionActions.getTrans(transactions))
                dispacth(transactionActions.getIncomeTrans(incomeTransactions))
                dispacth(transactionActions.getExpenseTrans(expenseTransactions))
                setChild(<Report/>)
            }
        }
        fetchData()
    }, [myWallet.id])

    return (
        <>
            {child}
        </>
    )
}