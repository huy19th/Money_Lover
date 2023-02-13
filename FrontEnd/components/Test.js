import {useDispatch, useSelector} from "react-redux";
import {testActions} from "@/features/test/testSlice";
import Wallets from "@/components/UI/DashBoard/WalletsList";
import * as React from "react";
import BasicMenu from "@/components/MenuTest";

export default function MyTest() {

    const dispatch = useDispatch()
    const handleCLick = () => {
        dispatch(testActions.changeValues())
    }
    const myArr = useSelector(state => state.test)

    // let result = 0
    //
    // myArr.map(item => {
    //     result += item.balance
    // })

    return (
        <>
            <div>
                <p className='m-0'>Id: {myArr.current.id}</p>
                <p className='m-0'>Balance: {myArr.current.balance}</p>
            </div>
            <div>
                <BasicMenu/>
            </div>
            <button type='button' onClick={handleCLick}>CLick</button>
        </>
    )
}