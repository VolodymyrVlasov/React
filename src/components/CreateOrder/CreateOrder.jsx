import {useEffect} from "react";
import useFetch from "../../hooks/useFetch";
import AutoSearchSelect from "../AutoSearchSelect/AutoSearchSelect";
import "./CreateOrder.css"
import SearchSelect from "../SearchSelect/SearchSelect";
import AddProduct from "../AddTask/AddProduct";
import {useOrder} from "../../hooks/useOrder";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";
import CommentForm from "../CommentForm/CommentForm";
import {getEnumNames} from "../../utils/utils";
import {useTasks} from "../../hooks/useTasks";

const CreateOrder = () => {
    const {data: makers, loading: makersLoading, error: makersError, fetchData: makersFetch} = useFetch()
    const {data: order, loading: orderLoading, error: orderError, fetchData: orderFetch} = useFetch()
    const {data: deliveryTypes, fetchData: deliveryTypesFetch} = useFetch()
    const {data: paymentTypes, fetchData: paymentTypesFetch} = useFetch()
    const {data: orderStatusTypes, fetchData: orderStatusTypesFetch} = useFetch()
    const [state, dispatch] = useOrder()
    const [appContext, appDispatch] = useTasks()

    useEffect(() => {
        makersFetch('searchCustomersByRole', 'MAKER')
        deliveryTypesFetch('getDeliveryTypes')
        paymentTypesFetch('getPaymentTypes')
        orderStatusTypesFetch('getOrderStatusTypes')
    }, [])

    useEffect(() => {
        getEnumNames(deliveryTypes)
    }, [deliveryTypes])

    const addMaker = (maker) => dispatch({type: "addMaker", payload: maker})

    const addComment = (commentMessage) => {
        const comment = {
            author: {customerId: 1},
            message: commentMessage
        }
        dispatch({type: "addComment", payload: comment})
    }

    const addDelivery = (deliveryType) => dispatch({type: "addDeliveryType", payload: deliveryType?.type})
    const addPayment = (paymentType) => dispatch({type: "addPaymentType", payload: paymentType?.type})

    const createOrder = () => {
        if (state.customer && state.maker && state.cartItems) {
            orderFetch("createOrder", state)
        }
    }

    if (orderLoading) {
        return <Loading/>
    }

    if (order) {
        return <div className="col col-gap">
            <p className="create_order-title">Order #{order.orderId} saved</p>
            <Button buttonText={"Okay"} onClickFunc={() => appDispatch({type: "changeNewTaskPopup"})}/>
        </div>
    }

    return (
        <div className="col col-gap">
            <h2 className="create_order-title">New order form</h2>
            <div className="row w-100 gap-24">
                <div id="maker" className="col col-gap create_order-maker_cnt">
                    <p>Manager</p>
                    <SearchSelect list={makers} handleSelected={addMaker}/>
                </div>
                <div id="maker" className="col col-gap create_order-maker_cnt">
                    <p>Maker</p>
                    <SearchSelect list={makers} handleSelected={addMaker}/>
                </div>
            </div>
            <div className="row w-100 gap-24">
                <div className="col col-gap">
                    <p>Delivery</p>
                    <SearchSelect list={getEnumNames(deliveryTypes)} handleSelected={addDelivery}/>
                </div>
                <div className="col col-gap">
                    <p>Payment</p>
                    <SearchSelect list={getEnumNames(paymentTypes)} handleSelected={addPayment}/>
                </div>
            </div>
            <div id="customer" className="col col-gap create_order-customer_cnt">
                <p>Customer</p>
                <AutoSearchSelect/>
            </div>
            <div className="col col-gap">
                <p>Tasks</p>
                <AddProduct/>
            </div>
            <div className="col col-gap">
                <p>Comment</p>
                <CommentForm addCommentCallback={addComment}/>
            </div>
            <Button onClickFunc={() => createOrder()} buttonText={"Create"}/>
        </div>
    )
}

export default CreateOrder