import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {testActions} from "@/features/test/testSlice";
import MyTest from "@/components/Test";

export default function Test() {

    const dispatch = useDispatch()

    const [child, setChild] = useState(<p>Loading...</p>)

    useEffect(() => {
        const array = [
            {
                id: 1,
                balance: 1
            },
            {
                id: 2,
                balance: 2
            }
        ]
        dispatch(testActions.getValues(array))
        setChild(<MyTest/>)
    }, [])

    return (
        <>
            {child}
        </>
    )
}