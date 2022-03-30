import "./Order.css"
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Loading from "../../components/Loading/Loading";
import useFetch from "../../hooks/useFetch";
import AddProduct, {Task} from "../../components/AddProduct/AddProduct";
import Button from "../../components/Button/Button";
import {getEnumNames} from "../../utils/utils";
import {CSSTransition} from "react-transition-group";
import SearchSelect from "../../components/SearchSelect/SearchSelect";
import {useAppContext} from "../../hooks/useAppContext";
import {useOrder} from "../../hooks/useOrder";
import SelectCustomer from "../../components/SelectCustomer/SelectCustomer";

const Order = () => {
    const params = useParams()
    const {data, loading, error, fetchData} = useFetch()
    const [order, setOrder] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const navigate = useNavigate()
    const [state, dispatch] = useOrder()

    useEffect(() => {
        fetchData("getOrderById", params.id)
    }, [])

    useEffect(() => {
        console.error("data", data, order)
    }, [data])

    useEffect(() => {
        if (data) {
            setOrder(data)
            setIsVisible(true)
        }
        return () => setIsVisible(false)
    }, [data])

    const updateOrder = () => {
        fetchData("updateOrder", state)
    }

    if (loading) {
        return (
            <CSSTransition in={!isVisible} timeout={200}
                           classNames="fade-animation" unmountOnExit>
                <Loading/>
            </CSSTransition>
        )
    }

    return (
        <CSSTransition in={isVisible} timeout={200}
                       classNames="fade-animation" unmountOnExit>
            <section className={"container col-left gap-24"}>
                <div className="row-left full-width">
                    <div className="row-left flex-1">
                        <Button onClickFunc={() => navigate(-1)} buttonText={"Back"}/>
                    </div>
                    <div className="row-right flex-1">
                        <Button onClickFunc={() => updateOrder()} buttonText={"Save"}/>
                    </div>
                </div>
                <div className="row-left gap-24 full-width">
                    <div className="col-left flex-1">
                        <OrderProfile order={order}/>
                    </div>

                    <div className="col-left flex-4 gap-8">
                        <div className="theme-card col-left full-width gap-12">
                            <OrderAttributes order={order}/>
                        </div>
                        <div className="theme-card col-left full-width gap-12">
                            <p className={"text-primary-label"}>Add cart item</p>
                            <AddProduct/>
                        </div>
                        <div className="theme-card col-left full-width gap-12">
                            <OrderForm order={order}/>
                        </div>
                    </div>
                </div>
            </section>
        </CSSTransition>
    )
}

export default Order

const OrderProfile = ({order}) => {
    const formatDate = (raw) => {
        const options = {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "numeric",
            hour12: false
        }
        if (!raw) {
            return "Not edited yet"
        }
        return new Date(raw).toLocaleString("en-gb", options)
    }

    return (
        <aside className="col-left gap-24">
            <div className="col-left gap-8">
                <p className="text-primary-label">Order id</p>
                <p className="text-h2--bold">{order?.orderId}</p>
            </div>
            <div className="col-left gap-8">
                <p className="text-primary-label">Created</p>
                <p className="text-h4--bold">{formatDate(order?.createdDate)}</p>
            </div>
            <div className="col-left gap-8">
                <p className="text-primary-label">Last edited</p>
                <p className="text-h4--bold">{formatDate(order?.editedDate)}</p>
            </div>
            <div className="col-left gap-8">
                <p className="text-primary-label">Must be finished</p>
                <p className="text-h4--bold">{formatDate(order?.finishedDate)}</p>
            </div>
        </aside>
    )
}

const OrderAttributes = ({order}) => {
    const [state, dispatch] = useOrder()
    const [{manager}] = useAppContext()
    const {data: makers, loading: makersLoading, error: makersError, fetchData: makersFetch} = useFetch()
    const {data: managers, loading: managersLoading, error: managersError, fetchData: managersFetch} = useFetch()
    const {data: paymentTypes, fetchData: paymentTypesFetch} = useFetch()
    const {data: orderStatusTypes, fetchData: orderStatusTypesFetch} = useFetch()
    const {data: deliveryTypes, fetchData: deliveryTypesFetch} = useFetch()

    useEffect(async () => {
        if (!state.orderId) {
            dispatch({type: "fillOrder", payload: order})
        }
        await makersFetch('searchCustomersByRole', 'MAKER')
        await managersFetch('searchCustomersByRole', 'MANAGER')
        await orderStatusTypesFetch("getOrderStatusTypes")
        await paymentTypesFetch('getPaymentTypes')
        await deliveryTypesFetch('getDeliveryTypes')
    }, [])

    const addMaker = (maker) => dispatch({type: "addMaker", payload: maker})
    const addManager = (manager) => dispatch({type: "addManager", payload: manager})
    const addDelivery = (deliveryType) => dispatch({type: "addDeliveryType", payload: deliveryType?.type})
    const addPayment = (paymentType) => dispatch({type: "addPaymentType", payload: paymentType?.type})
    const addStatus = (status) => dispatch({type: "addStatus", payload: status?.type})

    return (
        <section className="col-left gap-24 full-width ">
            <div className="row-left gap-16 full-width">
                <div className=" col-left gap-8 flex-1">
                    <p className="text-primary-label">Manager</p>
                    <SearchSelect list={managers} handleSelected={addManager} defaultValue={order.manager}/>
                </div>
                <div className=" col-left gap-8 flex-1">
                    <p className="text-primary-label">Maker</p>
                    <SearchSelect list={makers} handleSelected={addMaker} defaultValue={order.maker}/>
                </div>
            </div>

            <div className="row-left gap-24 full-width">
                <div className=" col-left gap-8 flex-1">
                    <p className="text-primary-label">Customer</p>
                    <SelectCustomer defaultValue={order.customer}/>
                </div>
            </div>
            <div className="row-left gap-24 full-width">
                <div className=" col-left gap-8 flex-1">
                    <p className="text-primary-label">Delivery</p>
                    <SearchSelect list={getEnumNames(deliveryTypes)} handleSelected={addDelivery}
                                  defaultValue={getEnumNames([order.deliveryType])[0]}/>
                </div>
                <div className=" col-left gap-8 flex-1">
                    <p className="text-primary-label">Payment</p>
                    <SearchSelect list={getEnumNames(paymentTypes)} handleSelected={addPayment}
                                  defaultValue={getEnumNames([order.paymentType])[0]}/>
                </div>
                <div className=" col-left gap-8 flex-1">
                    <p className="text-primary-label">Status</p>
                    <SearchSelect list={getEnumNames(orderStatusTypes)} handleSelected={addStatus}
                                  defaultValue={getEnumNames([order.status])[0]}/>
                </div>
            </div>
        </section>
    )

}

const OrderForm = ({order}) => {
    return (
        <section className="col-left full-width gap-24">
            <div className="col-left gap-8 full-width">
                <p className="text-primary-label">Cart items</p>
                <div className="col-left full-width gap-8">{
                    order?.cartItems.map(item => <Task cartItem={item}/>)
                }
                </div>
            </div>

            <div className="row-left gap-8 full-width">
                <div className=" col-left gap-8 flex-1">
                    <p className="text-primary-label">Total price</p>
                    <p className="text-h2">{order?.totalPrice}</p>
                </div>
                <div className=" col-left gap-8 flex-1">
                    <p className="text-primary-label">Paid</p>
                    <p className="text-h2">{order?.paid}</p>
                </div>
                <div className=" col-left gap-8 flex-1">
                    <p className="text-primary-label">For pay</p>
                    <p className="text-h2--bold">{Number(order?.totalPrice) - Number(order?.paid)}</p>
                </div>
            </div>

        </section>

    )
}