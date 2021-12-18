import {useAuth} from "../../hooks/useAuth";
import {useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch";
import AutoSearchSelect from "../AutoSearchSelect/AutoSearchSelect";
import OrderProvider from "../../context/OrderContext";
import {useOrder} from "../../hooks/useOrder";

const CreateOrder = () => {
    const {order} = useOrder()
    const fetchMakers = useFetch()
    const {user} = useAuth();
    const [makers, setMakers] = useState([])

    useEffect(() => {
        !fetchMakers.data && fetchMakers.fetchData("getUsers")
        setMakers(fetchMakers.data)
    }, [fetchMakers])


    return (
        <OrderProvider>
            <div className="col col-gap">
                <div>
                    <p>Order number</p>
                    <input type="text" name="orderId"/>
                </div>
                <div id="customer">
                    <p>Customer</p>
                    <AutoSearchSelect/>
                </div>
                <div id="maker">
                    <p>Maker</p>
                    <select name="maker" id="maker">{
                        makers?.users?.map((maker, index) => {
                            return (
                                <option key={index} id={maker.id}>{maker.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <p>Tasks</p>
                    <div>
                        <select name="product" id="product">
                            <option value="business-card">Biz cards</option>
                            <option value="digital-printing">Digital printing</option>
                            <option value="cup">Cups</option>
                            <option value="poster">Posters</option>
                        </select>
                        <label htmlFor="amount">
                            <span>Amount</span>
                            <input type="number" id="amount"/>
                        </label>
                        <label htmlFor="price">
                            <span>Price</span>
                            <input type="number" id="price"/>
                        </label>
                    </div>
                    <button>+</button>
                </div>
                <div>
                    <p>Comment</p>
                    <textarea name="" id="message" cols="30" rows="3"/>
                </div>
                <div>
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
                <div>
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