import {Navigate, useLocation, useNavigate} from "react-router-dom";

const RequireAuth = ({children}) => {
    const usr = JSON.parse(localStorage.getItem("user"))
    const location = useLocation()

    if (usr && location.pathname !== "/login") {
        return <>{children}</>
    }

    if (!usr && location.pathname !== "/login") {
        return <Navigate to="/login" replace={true}/>
    }

    return <></>
}

export default RequireAuth