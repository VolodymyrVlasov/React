import Header from "./components/Header/Header"
import {useAppContext} from "./hooks/useAppContext"
import Popup from "./pages/Popup/Popup"
import CreateOrder from "./components/CreateOrder/CreateOrder"
import OrderProvider from "./context/OrderContext"
import Auth from "./pages/Auth/Auth"
import Orders from "./pages/Orders/Orders"
import Customers from "./pages/Customers/Customers"
import Products from "./pages/Products/Products"
import {Navigate, Route, Routes} from "react-router-dom"
import PageNotFound from "./pages/PageNotFound/PageNotFound"
import Profile from "./pages/Profile/Profile"
import Design from "./pages/Design/Design"
import RequireAuth from "./hoc/RequireAuth"
import Order from "./pages/Order/Order"

import "./styles/index.css"
import "./styles/App.css"

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
            <RequireAuth redirectTo={false}>
                <Header/>
            </RequireAuth>

            <Routes>
                <Route path="" element={<Navigate to='/orders'/>}/>
                <Route path="login" element={<Auth/>}/>
                <Route path={"orders"} element={<RequireAuth><Orders/></RequireAuth>}>
                    <Route path=":status" element={<RequireAuth><Orders/></RequireAuth>}/>
                </Route>
                <Route path="orders/order/:id"
                       element={
                           <RequireAuth>
                               <OrderProvider>
                                   <Order/>
                               </OrderProvider>
                           </RequireAuth>}/>
                <Route path="profile" element={<RequireAuth><Profile/></RequireAuth>}/>
                <Route path="customers" element={<RequireAuth><Customers/></RequireAuth>}/>
                <Route path="products" element={<RequireAuth><Products/></RequireAuth>}/>
                <Route path="design" element={<RequireAuth><Design/></RequireAuth>}/>
                <Route path="404" element={<PageNotFound/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </>
    );
}

export default App


