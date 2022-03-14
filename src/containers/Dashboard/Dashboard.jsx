import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading/Loading";
import {useEffect, useState} from "react";
import {useAppContext} from "../../hooks/useAppContext";
import "./Dashboard.css"
import {OrderCard} from "../../components/OrderCard/OrderCard";
import {search} from "../../utils/search";
import {Navigate, useNavigate} from "react-router-dom";

const Dashboard = () => {
    const {data, error, loading, fetchData} = useFetch()
    const [{orders, manager, searchQuery}, dispatch] = useAppContext()
    const [refresh, setRefresh] = useState(false)
    const [ordersToRender, setOrdersToRender] = useState(null)
    const navigate = useNavigate()


    useEffect(async () => {
        await fetchData("getOrders")
        const orderListUpdateTimer = setTimeout(() => {
            setRefresh(!refresh)
        }, 5000)

        return () => clearTimeout(orderListUpdateTimer)
    }, [refresh])

    useEffect(() => {
        if (searchQuery) {
            setOrdersToRender(search({array: orders, key: searchQuery}).resultArray)
        }
        if (orders && !searchQuery) {
            setOrdersToRender(orders)
        }
    }, [orders, searchQuery])

    useEffect(() => {
        !error && dispatch({type: "updateOrderList", payload: data})
    }, [data, error])

    if (loading) {
        const timer = setTimeout(() => {
            return <Loading/>
        }, 100)


    }

    if (manager == null) {
        // return navigate('/login')
        return <Navigate to={'/login'}/>
    }

    // if (error) {
    //     return <LoadingError error={error}/>
    // }

    return (
        <section className="container row-left wrap gap-12">
            {ordersToRender != null && ordersToRender?.map(order => <OrderCard key={order.orderId} order={order}/>)}
        </section>
    )
}

export default Dashboard
