import Header from "./components/Header/Header";
import {useAppContext} from "./hooks/useAppContext";
import Popup from "./containers/Popup/Popup";
import CreateOrder from "./components/CreateOrder/CreateOrder";
import OrderProvider from "./context/OrderContext";
import Auth from "./containers/Auth/Auth";
import Dashboard from "./containers/Dashboard/Dashboard";
import Customers from "./containers/Customers/Customers";
import Products from "./containers/Products/Products";
import {Navigate, Route, Routes} from "react-router-dom";
import PageNotFound from "./containers/PageNotFound/PageNotFound";
import RequireAuth from "./hoc/RequireAuth";
import Profile from "./containers/Profile/Profile";
import Design from "./containers/Design/Design";

import "./styles/index.css"
import "./styles/App.css";

const App = () => {
    const [{isNewTaskPopup}, dispatch] = useAppContext()

    const handleClose = () => dispatch({type: "changeNewTaskPopup"})

    return (
        <>{isNewTaskPopup &&
        <Popup handleClose={handleClose}>
            <OrderProvider>
                <CreateOrder/>
            </OrderProvider>
        </Popup>
        }
            <RequireAuth>
                <Header/>
            </RequireAuth>
            <Routes>
                <Route path="" element={<Navigate to='/dashboard'/>}/>
                <Route path="login" element={<Auth/>}/>
                <Route path="dashboard" element={<RequireAuth><Dashboard/></RequireAuth>}/>
                <Route path="profile" element={<RequireAuth><Profile/></RequireAuth>}/>
                <Route path="users" element={<RequireAuth><Customers/></RequireAuth>}/>
                <Route path="products" element={<RequireAuth><Products/></RequireAuth>}/>
                <Route path="design" element={<Design/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </>
    );
}

export default App


