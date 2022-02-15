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

const CreateOrder = () => {
    const {data: makers, loading: makersLoading, error: makersError, fetchData: makersFetch} = useFetch()
    const {data: order, loading: orderLoading, error: orderError, fetchData: orderFetch} = useFetch()
    const {data: deliveryTypes, fetchData: deliveryTypesFetch} = useFetch()
    const {data: paymentTypes, fetchData: paymentTypesFetch} = useFetch()
    const {data: orderStatusTypes, fetchData: orderStatusTypesFetch} = useFetch()
    const [state, dispatch] = useOrder()

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
        return <div>Order #{order.orderId} saved</div>
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


            {/*<div className="col col-gap">*/}
            {/*    <p>Comment</p>*/}
            {/*    <textarea name="" id="message" cols="30" rows="3"/>*/}
            {/*</div>*/}
            {/*<div className="col col-gap">*/}
            {/*    <p>Summary</p>*/}
            {/*    <span>Total price: <strong>777</strong></span>*/}
            {/*    <label htmlFor="paid">*/}
            {/*        <span>Paid</span>*/}
            {/*        <input type="number" id="paid"/>*/}
            {/*    </label>*/}
            {/*    <select name="paymentType" id="payment-type">*/}
            {/*        <option value="cash">cash</option>*/}
            {/*            <option value="cash">liqpay</option>*/}
            {/*            <option value="cash">iban</option>*/}
            {/*            <option value="cash">cash</option>*/}
            {/*        </select>*/}
            {/*        <span>Payable: <strong>111</strong></span>*/}
            {/*    </div>*/}
            {/*    <div className="col col-gap">*/}
            {/*        <p>Delivery</p>*/}
            {/*        <select name="delivery" id="delivery">*/}
            {/*            <option value="pick">pick</option>*/}
            {/*            <option value="nova-poshta">nova poshta</option>*/}
            {/*            <option value="uklon">uklon</option>*/}
            {/*        </select>*/}
            {/*    </div>*/}

            <Button onClickFunc={() => createOrder()} buttonText={"Create"}/>
        </div>
    )
}

export default CreateOrder