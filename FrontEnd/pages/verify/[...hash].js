import { useRouter } from "next/router";
import { useEffect } from "react";
import UserService from "@/services/user.service";

const Hash = () => {
    const router = useRouter();
    const { hash } = router.query;
    useEffect(() => {
        if (!hash) {
            return;
        }
        UserService.verifyEmail(hash)
        .then(res => {
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        })
        .catch(err => {
            console.log(err.response.data.message)
        })
    }, [hash])

    return <p>Verifying Email...</p>
}

export default Hash;