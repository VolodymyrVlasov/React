import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading/Loading";
import {useEffect} from "react";
import {useTasks} from "../../hooks/useTasks";
import TaskCard from "../../components/TaskCard/TaskCard";

const Dashboard = () => {
    const {data, error, loading, fetchData} = useFetch()
    const [{orders, makers, searchParams}, dispatch] = useTasks()

    useEffect(() => fetchData("getAllTodos"), [])

    useEffect(() => {
        !error && dispatch({type: "updateOrderList", payload: data})
    }, [data, error])

    if (loading) return (<Loading/>)

    return (
        <section className="container">
            {orders != null && orders.map(order => <TaskCard key={order.orderId} order={order}/>)}
        </section>
    )
}

export default Dashboard