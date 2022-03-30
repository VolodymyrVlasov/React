import useFetch from "../../hooks/useFetch";
import {useEffect, useState} from "react";
import {useAppContext} from "../../hooks/useAppContext";
import "./Orders.css"
import {OrderCard} from "../../components/OrderCard/OrderCard";
import {useNavigate, useParams} from "react-router-dom";
import {CSSTransition} from "react-transition-group";
import Loading from "../../components/Loading/Loading";
import LoadingError from "../../components/LoadingError/LoadingError";
import Button from "../../components/Button/Button";
import {getEnumNames} from "../../utils/utils";

const Orders = () => {
    const ORDER_LIST_REFRESH_TIME = 5000
    const [{orders, manager, searchQuery, isNewTaskPopup}, appDispatch] = useAppContext()
    const [refresh, setRefresh] = useState(false)
    const [ordersToRender, setOrdersToRender] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const {data, error, loading, fetchData} = useFetch()
    const {data: orderStatusTypes, fetchData: orderStatusTypesFetch} = useFetch()
    const {status} = useParams()
    const navigate = useNavigate()

    useEffect(async () => {
        await orderStatusTypesFetch("getOrderStatusTypes")
    }, [])

    useEffect(async () => {
        console.log("status", status)
        await fetchData("getOrders")
        setTimeout(() => {
            setRefresh(!refresh)
        }, ORDER_LIST_REFRESH_TIME)
    }, [refresh])

    useEffect(() => {
        if (orders && data) {
            if (orders?.length !== ordersToRender?.length) {
                setIsUpdate(true)
            }
            let ordersStr = JSON.stringify(orders)
            let dataStr = JSON.stringify(data)
            if (ordersStr !== dataStr) {
                appDispatch({type: "setOrders", payload: data})
                setIsUpdate(true)
            }
        }
    }, [data])

    useEffect(() => {
        if (isUpdate) {
            setOrdersToRender(orders)
            setIsUpdate(!isUpdate)
        }
    }, [isUpdate])

    useEffect(() => {
        if (ordersToRender.length > 0) {
            setIsVisible(true)
        }
    }, [ordersToRender])

    if (loading && ordersToRender.length === 0) {
        return <Loading/>
    }

    if (error && ordersToRender.length === 0) {
        return <LoadingError/>
    }

    return (
        <CSSTransition in={isVisible} timeout={700}
                       classNames="fade-animation" unmountOnExit>
            <section className="container col-left gap-24">
                <div className="container row-center gap-24">
                    <Button buttonText="All" onClickFunc={() => navigate("/orders", {replace: true})}/>
                    {orderStatusTypes && orderStatusTypes?.map(item => {
                        let name = getEnumNames([item])[0]["name"]
                        return (
                            <Button buttonText={name}
                                    onClickFunc={() => navigate(`/orders/${name.toLowerCase()}`, {replace: true})}/>
                        )
                    })}
                </div>
                <div className="row-left full-width gap-12 wrap">
                    {ordersToRender.filter(order => status ? order.status === status.toUpperCase() : true).map(order =>
                        <OrderCard
                            key={order.orderId} order={order}/>)}
                </div>
            </section>
        </CSSTransition>
    )
}

export default Orders
