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
        <section className="container order-revert">
            {orders != null && orders.reverse().map(order => <OrderCard key={order.orderId} order={order}/>)}
        </section>
    )
}

export default Dashboard

export const OrderCard = ({order}) => {

    const getProductTagSet = (array) => {
        return Array.from(new Set(array.map(e => e.product.productType)))
            .map(e => getEnumNames([e])[0]["name"])
    }

    return (
        <div className="order_card col col-gap">
            <p className="text">Order #{order.orderId}</p>
            <div>
                <p className="text-label">To do types</p>
                <div className="row-wrap gap-8">{
                    getProductTagSet(order.cartItems).map((cartItem, index) => {
                            return (
                                <span key={index} className="order_card-cart_item_tag">{cartItem}</span>
                            )
                        }
                    )
                }
                </div>
            </div>
            <div>
                <p className="text-label">Delivery</p>
                <div className="row">
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