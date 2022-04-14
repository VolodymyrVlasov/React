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
import {useEffect} from "react";
import useFetch from "./hooks/useFetch";
import {getEnumNames} from "./utils/utils";

const App = () => {
    const [{isNewTaskPopup}, dispatch] = useAppContext()
    const {data: manager, fetchData: managerFetch} = useFetch()
    const {data: makers, fetchData: makersFetch} = useFetch()
    const {data: managers, fetchData: managersFetch} = useFetch()
    const {data: paymentTypes, fetchData: paymentTypesFetch} = useFetch()
    const {data: orderStatusTypes, fetchData: orderStatusTypesFetch} = useFetch()
    const {data: deliveryTypes, fetchData: deliveryTypesFetch} = useFetch()
    const [appContext, appDispatch] = useAppContext()
    const user = JSON.parse(localStorage.getItem("user"))


    const handleClose = () => dispatch({type: "changeNewTaskPopup"})

    useEffect(async () => {
        console.count("FETCH IN APP")
        await makersFetch('searchCustomersByRole', 'MAKER')
        await managersFetch('searchCustomersByRole', 'MANAGER')
        await managersFetch('getManagerByUid', user.uid)
        await orderStatusTypesFetch("getOrderStatusTypes")
        await paymentTypesFetch('getPaymentTypes')
        await deliveryTypesFetch('getDeliveryTypes')
    }, [])

    useEffect(() => {
        appDispatch({type: "addMakers", payload: makers})
        appDispatch({type: "addManagers", payload: managers})
        appDispatch({type: "addPaymentType", payload: getEnumNames(paymentTypes)})
        appDispatch({type: "addStatus", payload: getEnumNames(orderStatusTypes)})
        appDispatch({type: "addDeliveryType", payload: getEnumNames(deliveryTypes)})
        appDispatch({type: "setManager", payload: manager})
    }, [makers, manager, managers, paymentTypes, orderStatusTypes, deliveryTypes])

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


