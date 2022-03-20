import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading/Loading";
import {useEffect, useState} from "react";
import {useAppContext} from "../../hooks/useAppContext";
import "./Dashboard.css"
import {OrderCard} from "../../components/OrderCard/OrderCard";
import {search} from "../../utils/search";
import {Navigate, useNavigate} from "react-router-dom";
import LoadingError from "../../components/LoadingError/LoadingError";

const Dashboard = () => {
    const {data, error, loading, fetchData} = useFetch()
    const [{orders, manager, searchQuery, isNewTaskPopup}, dispatch] = useAppContext()
    const [refresh, setRefresh] = useState(false)
    const [ordersToRender, setOrdersToRender] = useState(null)
    const navigate = useNavigate()
    let [isMount, setIsMount] = useState(true)

    let loadingTimer, orderListUpdateTimer

    useEffect(() => {
        return () => {
            clearTimeout(orderListUpdateTimer)
            clearTimeout(loadingTimer)
            setIsMount(false)
        }
    }, [])

    useEffect(async () => {
        if (isMount && !isNewTaskPopup) {
            await fetchData("getOrders")
            orderListUpdateTimer = setTimeout(() => {
                console.count("dashboard refresh")
                setRefresh(!refresh)
            }, 5000)
        }
    }, [refresh])

    useEffect(() => {
        if (isMount) {
            if (searchQuery) {
                setOrdersToRender(search({array: orders, key: searchQuery}).resultArray)
            }
            if (orders && !searchQuery) {
                setOrdersToRender(orders)
            }
        }
    }, [orders, searchQuery])

    useEffect(() => {
        if (isMount) {
            !error && dispatch({type: "updateOrderList", payload: data})
        }
    }, [data, error])

    if (loading) {
        loadingTimer = setTimeout(() => {
            return <Loading/>
        }, 100)
    }

    if (manager == null) {
        // return navigate('/login')
        return <Navigate to={'/login'}/>
    }

    if (error) {
        return <LoadingError error={error}/>
    }

    return (
        <section className="container row-left wrap gap-12">
            {ordersToRender != null && ordersToRender?.map(order => <OrderCard key={order.orderId} order={order}/>)}
        </section>
    )
}

export default Dashboard
