import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading/Loading";
import {useEffect, useState} from "react";
import {useTasks} from "../../hooks/useTasks";
import "./Dashboard.css"
import {OrderCard} from "../../components/OrderCard/OrderCard";
import {search} from "../../utils/Search";

const Dashboard = () => {
    const {data, error, loading, fetchData} = useFetch()
    const [{orders, makers, searchQuery}, dispatch] = useTasks()
    const [refresh, setRefresh] = useState(false)
    const [ordersToRender, setOrdersToRender] = useState(null)

    useEffect(() => {
        fetchData("getOrders")
        updateOrderList()
    }, [refresh])

    const updateOrderList = () => {
        setTimeout(() => {
            setRefresh(!refresh)
        }, 5000)
    }

    useEffect(() => {
        if (searchQuery) {
            console.time("SEARCH")
            setOrdersToRender(search({array: orders, key: searchQuery}).resultArray)
            console.timeEnd("SEARCH")

        }
        if (orders && !searchQuery) {
            setOrdersToRender(orders)
        }
    }, [orders, searchQuery])

    useEffect(() => {
        !error && dispatch({type: "updateOrderList", payload: data})
    }, [data, error])

    if (loading) setTimeout(() => loading && <Loading/>, 100)

    return (
        <section className="container order-revert">
            {ordersToRender != null && ordersToRender?.map(order => <OrderCard key={order.orderId} order={order}/>)}
        </section>
    )
}

export default Dashboard
