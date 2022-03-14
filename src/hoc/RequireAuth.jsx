import {useLocation, useNavigate} from "react-router-dom";
import {useAppContext} from "../hooks/useAppContext";
import {useAuth} from "../hooks/useAuth";

const RequireAuth = ({children}) => {
    const location = useLocation()
    const [context,] = useAppContext()
    const navigate = useNavigate()

    const user = useAuth()

    // debugger

    console.log(context)
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