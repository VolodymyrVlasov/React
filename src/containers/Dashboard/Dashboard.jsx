import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading/Loading";
import {useEffect, useState} from "react";
import {useTasks} from "../../hooks/useTasks";
import "./Dashboard.css"
import {OrderCard} from "../../components/OrderCard/OrderCard";

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
        console.log("searchQuery", searchQuery)
        if (orders && searchQuery && searchQuery !== "") {
            const filteredOrders = orders.filter(order => {
                console.table(order)
                return Object.values(order).some(value => {
                    if (value != null) {
                        // if (value instanceof Object && !(value instanceof Array)) {
                        //     // console.log("object -> ", value)
                        // }
                        //
                        // if (value instanceof Array) {
                        //     console.log("value is array", value)
                        //
                        //     value.filter(arrElement => {
                        //         if (arrElement instanceof Object && !(arrElement instanceof Array)) {
                        //             console.log("arrElement -> ", value)
                        //         }
                        //     })
                        // }

                        if (typeof value === "string" || typeof value === "number") {
                            console.info(value, searchQuery)
                            return String(value).toLowerCase().includes(searchQuery.toLowerCase())
                        }
                        return false
                    }
                })
            })

            if (filteredOrders.length > 0) {
                setOrdersToRender(filteredOrders)
            }
        }
        if (searchQuery == null || searchQuery === "") {
            setOrdersToRender(orders)
        }
    }, [orders, searchQuery])

    useEffect(() => {
        !error && dispatch({type: "updateOrderList", payload: data})
    }, [data, error])

    if (loading) setTimeout(() => loading && <Loading/>, 100)

    return (
        <section className="container order-revert">
            {ordersToRender != null && ordersToRender.map(order => <OrderCard key={order.orderId} order={order}/>)}
        </section>
    )
}

export default Dashboard
