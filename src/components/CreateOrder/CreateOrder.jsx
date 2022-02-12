import {useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch";
import AutoSearchSelect from "../AutoSearchSelect/AutoSearchSelect";
import "./CreateOrder.css"
import SearchSelect from "../SearchSelect/SearchSelect";
import AddTask from "../AddTask/AddTask";
import {useOrder} from "../../hooks/useOrder";
import Button from "../Button/Button";

const CreateOrder = () => {
    // const fetchMakers = useFetch()

    const {data: makers, loading: makersLoading, error: makersError, fetchData: makersFetch} = useFetch()
    // const fetchOrder = useFetch()
    // const [makers, setMakers] = useState([])
    const [state, dispatch] = useOrder()


    useEffect(() => {
        makersFetch('searchCustomersByRole', 'MAKER')
    }, [])

    const maker = (maker) => {
        dispatch({type: "addMaker", payload: maker})
    }

    const createOrder = () => {
        if (state.customer && state.maker && state.tasks) {
            // fetchOrder.fetchData("createOrder", state)
        }
    }

    useEffect(() => {
        console.log('In CreateOrder makers are: ', makers)
    }, [makers])


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
                <AddTask/>
            </div>
            <div className="col col-gap">
                <p>Comment</p>
                <textarea name="" id="message" cols="30" rows="3"/>
            </div>
            <div className="col col-gap">
                <p>Summary</p>
                <span>Total price: <strong>777</strong></span>
                <label htmlFor="paid">
                    <span>Paid</span>
                    <input type="number" id="paid"/>
                </label>
                <select name="paymentType" id="payment-type">
                    <option value="cash">cash</option>
                        <option value="cash">liqpay</option>
                        <option value="cash">iban</option>
                        <option value="cash">cash</option>
                    </select>
                    <span>Payable: <strong>111</strong></span>
                </div>
                <div className="col col-gap">
                    <p>Delivery</p>
                    <select name="delivery" id="delivery">
                        <option value="pick">pick</option>
                        <option value="nova-poshta">nova poshta</option>
                        <option value="uklon">uklon</option>
                    </select>
                </div>

            <Button onClickFunc={() => createOrder()} buttonText={"Create"}/>
            </div>
    )
}

export default CreateOrder