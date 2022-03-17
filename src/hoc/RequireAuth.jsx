import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

const RequireAuth = ({children}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const user = useAuth()

    if (user == null && location.pathname !== '/login') {
        navigate('/login', {replace: true})
        return <></>
    }

    if (user != null) {
        return <>{children}</>
    }

    return <></>
}

export default RequireAuth