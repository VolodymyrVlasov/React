import {useAuth} from "../../hooks/useAuth";
import {useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch";
import AutoSearchSelect from "../AutoSearchSelect/AutoSearchSelect";
import OrderProvider from "../../context/OrderContext";
import {useOrder} from "../../hooks/useOrder";
import "./CreateOrder.css"
import SearchSelect from "../SearchSelect/SearchSelect";
import AddTask from "../AddTask/AddTask";

const CreateOrder = () => {
    const {order} = useOrder()
    const fetchMakers = useFetch()
    const {user} = useAuth();
    const [makers, setMakers] = useState([])

    useEffect(() => {
        !fetchMakers.data && fetchMakers.fetchData("getUsers")
        setMakers(fetchMakers.data?.users)
    }, [fetchMakers])


    const maker = (maker) => {
        console.log("current maker -> ", maker)
    }

    return (
        <OrderProvider>
            <div className="col col-gap">
                <h2 className="create_order-title">New order form</h2>

                <div id="customer" className="col col-gap create_order-customer_cnt">
                    <p>Customer</p>
                    <AutoSearchSelect/>
                </div>
                <div id="maker" className="col col-gap create_order-maker_cnt">
                    <p>Maker</p>
                    <SearchSelect list={makers ? makers : []} handleSelected={maker}/>
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

                <button>Add</button>
            </div>
        </OrderProvider>
    )
}

export default CreateOrder