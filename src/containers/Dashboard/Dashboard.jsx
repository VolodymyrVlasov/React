import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading/Loading";
import {useEffect, useState} from "react";
import {useTasks} from "../../hooks/useTasks";
import TaskCard from "../../components/TaskCard/TaskCard";

const Dashboard = () => {
    const {data, error, loading, fetchData} = useFetch()
    const [{orders, makers, searchParams}, dispatch] = useTasks()
    const [refresh, setRefresh] = useState(false)

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
        !error && dispatch({type: "updateOrderList", payload: data})
    }, [data, error])

    if (loading) {
        setTimeout(() => {
            if (loading) {
                return <Loading/>
            }
        }, 100)
    }

    return (
        <section className="container">
            {orders != null && orders.map(order => <TaskCard key={order.orderId} order={order}/>)}
        </section>
    )
}

export default Dashboard