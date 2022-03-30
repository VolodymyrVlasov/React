import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useAuth} from "./useAuth";

export const useRequireAuth = (redirectUrl = "/login") => {
    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (auth.user === false) {
            navigate(redirectUrl, {state: location});
        }
        // if (auth.user && auth.user.emailVerified === false) {
        //     navigate("/checkEmail", {state: location});
        // }
    }, [auth])

    return auth
}
