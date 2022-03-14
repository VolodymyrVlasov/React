import {useOrder} from "../../hooks/useOrder";
import {useEffect, useState} from "react";
import InputNumber from "../InputNumber/InputNumber";
import SearchSelect from "../SearchSelect/SearchSelect";
import useFetch from "../../hooks/useFetch";
import {getEnumNames} from "../../utils/utils";
import Button from "../Button/Button";

const OrderSummary = () => {
    const [state, dispatch] = useOrder()
    const [discount, setDiscount] = useState(0)
    const [paid, setPaid] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [status, setStatus] = useState({name: "New", type: "NEW"})
    const {data: paymentTypes, fetchData: paymentTypesFetch} = useFetch()
    const {data: orderStatusTypes, fetchData: orderStatusTypesFetch} = useFetch()
    const {data: deliveryTypes, fetchData: deliveryTypesFetch} = useFetch()

    useEffect(() => {
        orderStatusTypesFetch("getOrderStatusTypes")
        paymentTypesFetch('getPaymentTypes')
        deliveryTypesFetch('getDeliveryTypes')
    }, [])

    useEffect(() => {
        calculateTotalPrice()
        dispatch({type: 'addDiscount', payload: discount})
        dispatch({type: 'addPaid', payload: paid})
        dispatch({type: 'addStatus', payload: status.type})
    }, [discount, paid, status, state?.cartItems])

    useEffect(() => {
        dispatch({type: "addTotalPrice", payload: totalPrice})
    }, [totalPrice])

    const calculateTotalPrice = () => {
        let price = 0
        state?.cartItems?.forEach(cartItem => price += cartItem.totalPrice)
        if (discount && discount > 0) {
            price -= discount
        }
        setTotalPrice(price)
    }

    const changeDiscount = (discountValue) => {
        if (discountValue && discountValue > 0 && discountValue < totalPrice) {
            setDiscount(discountValue)
        }
    }

    const changePaid = (paidValue) => {
        if (paidValue && paidValue > 0 && paidValue <= totalPrice) {
            setPaid(paidValue)
        }
    }

    const changeStatus = (statusValue) => {
        if (statusValue) {
            setStatus(statusValue)
        } else {
            setStatus({name: "New", type: "NEW"})
            dispatch({type: 'addStatus', payload: "NEW"})
        }
    }

    const addDelivery = (deliveryType) => dispatch({type: "addDeliveryType", payload: deliveryType?.type})

    const addPayment = (paymentType) => dispatch({type: "addPaymentType", payload: paymentType?.type})

    return (
        <div className="col-left gap-24">
            <div className="row-h-center_v-spb gap-24">
                <div className="col-left gap-12 full-width">
                    <p>Order status</p>
                    <SearchSelect list={getEnumNames(orderStatusTypes)}
                                  defaultValue={status} handleSelected={changeStatus}/>
                </div>
                <div className="col-left gap-12">
                    <p>Delivery</p>
                    <SearchSelect list={getEnumNames(deliveryTypes)} handleSelected={addDelivery}/>
                </div>
                <div className="col-left gap-12">
                    <p>Payment</p>
                    <SearchSelect list={getEnumNames(paymentTypes)} handleSelected={addPayment}/>
                </div>
            </div>
            <div className="row-h-center_v-spb gap-24">
                <div className="col-left gap-12 full-width">
                    <div className="row-h-center_v-spb">
                        <p>Discount</p>
                        <InputNumber min={0} max={totalPrice - 1} valueSate={discount}
                                     onChangeCallback={changeDiscount}/>
                    </div>
                    <div className="row-h-center_v-spb">
                        <p>Paid</p>
                        <Button buttonText={"Paid"} onClickFunc={() => changePaid(totalPrice)}/>
                        <InputNumber min={0} max={totalPrice} valueSate={paid}
                                     onChangeCallback={changePaid}/>
                    </div>
                </div>
                <div className="row-h-center_v-spb gap-24">
                    <div className="col-left gap-12">
                        <p>Total price</p>
                        <p className="text-h4--bold">{totalPrice}</p>
                    </div>
                    <div className="col-left gap-12">
                        <p>For pay</p>
                        <p className="text-h4--bold">{totalPrice - paid}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OrderSummary