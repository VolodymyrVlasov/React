import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading/Loading";
import {useEffect, useState} from "react";
import {useTasks} from "../../hooks/useTasks";
import "./Dashboard.css"
import {getEnumNames} from "../../utils/utils";

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

    if (loading) setTimeout(() => loading && <Loading/>, 100)

    return (
        <section className="container">
            {orders != null && orders.map(order => <OrderCard key={order.orderId} order={order}/>)}
        </section>
    )
}

export default Dashboard

export const OrderCard = ({order}) => {
    // console.table(order)
    return (
        <div className="order_card col col-gap">
            <p className="text">Order #{order.orderId}</p>
            <div>
                <p className="text-label">To do types</p>
                <div className="row gap-8">{
                    order?.cartItems?.map((cartItem, index) => {
                        const value = getEnumNames([cartItem?.product.productType])[0]["name"]
                        return (
                            <span key={index} className="order_card-cart_item_tag">{value}</span>
                        )
                    })
                }
                </div>
            </div>
            <div>
                <p className="text-label">Delivery</p>
                <div className="row gap-8">
                    {order?.deliveryType &&
                        <span
                            className="order_card-cart_item_tag">{getEnumNames([order?.deliveryType])[0]["name"]}</span>}
                </div>
            </div>
            <div>
                <p className="text-label">Payment</p>
                <div className="row gap-8">
                    {order?.paymentType &&
                        <span
                            className="order_card-cart_item_tag">{getEnumNames([order?.paymentType])[0]["name"]}</span>}
                </div>
            </div>


        </div>
    )
}