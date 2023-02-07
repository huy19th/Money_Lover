import {useEffect, useState} from "react";
import axios from 'axios'

export default function Home() {

    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const getUser = () => {
            axios.get('http://localhost:8000/auth/login/success', {
                withCredentials: true,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                }
            }).then((resObject) => {
                localStorage.setItem('token', resObject.data.accessToken)
                setCurrentUser({path: 'social'});
            }).catch(err => {
                console.log(err)
            })
        }
        if (!localStorage.getItem('token')) {
            getUser()
        } else {
            setCurrentUser({path: 'normal'})
        }
    }, [])

    console.log(currentUser)

    if (currentUser !== null) {
        return (
            <>
                <p>Hello {currentUser.path}</p>
            </>
        )
    } else {
        return <p>Loading...</p>
    }
}
