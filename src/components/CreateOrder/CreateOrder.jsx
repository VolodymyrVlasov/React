import {useEffect} from "react";
import useFetch from "../../hooks/useFetch";
import AutoSearchSelect from "../AutoSearchSelect/AutoSearchSelect";
import "./CreateOrder.css"
import SearchSelect from "../SearchSelect/SearchSelect";
import AddProduct from "../AddTask/AddProduct";
import {useOrder} from "../../hooks/useOrder";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";

const CreateOrder = () => {

    const {data: makers, loading: makersLoading, error: makersError, fetchData: makersFetch} = useFetch()
    const {data: order, loading: orderLoading, error: orderError, fetchData: orderFetch} = useFetch()

    const [state, dispatch] = useOrder()

    useEffect(() => {
        makersFetch('searchCustomersByRole', 'MAKER')
    }, [])

    const maker = (maker) => {
        dispatch({type: "addMaker", payload: maker})
    }

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

            <div id="customer" className="col col-gap create_order-customer_cnt">
                <p>Customer</p>
                <AutoSearchSelect/>
            </div>
            <div id="maker" className="col col-gap create_order-maker_cnt">
                <p>Maker</p>
                <SearchSelect list={makers} handleSelected={maker}/>
            </div>
            <div className="col col-gap">
                <p>Tasks</p>
                <AddProduct/>
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