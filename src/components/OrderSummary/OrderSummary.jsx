import {useOrder} from "../../hooks/useOrder";
import {useEffect, useState} from "react";
import InputNumber from "../InputNumber/InputNumber";
import SearchSelect from "../SearchSelect/SearchSelect";
import useFetch from "../../hooks/useFetch";
import {getEnumNames} from "../../utils/utils";
import Button from "../Button/Button";

const OrderSummary = () => {
    const [state, dispatch] = useOrder()
    const [isMount, setIsMount] = useState(true)
    const [discount, setDiscount] = useState(0)
    const [paid, setPaid] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [status, setStatus] = useState({name: "New", type: "NEW"})
    const {data: paymentTypes, fetchData: paymentTypesFetch} = useFetch()
    const {data: orderStatusTypes, fetchData: orderStatusTypesFetch} = useFetch()
    const {data: deliveryTypes, fetchData: deliveryTypesFetch} = useFetch()

    useEffect(async () => {
        if (isMount) {
            await orderStatusTypesFetch("getOrderStatusTypes")
            await paymentTypesFetch('getPaymentTypes')
            await deliveryTypesFetch('getDeliveryTypes')
        }

        return () => {
            setIsMount(false)
        }
    }, [])

    useEffect(() => {
        if (isMount) {
            calculateTotalPrice()
            dispatch({type: 'addDiscount', payload: discount})
            dispatch({type: 'addPaid', payload: paid})
            dispatch({type: 'addStatus', payload: status.type})
        }
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
        <div className="col-left gap-24 full-width">
            <div className="row-left gap-24 full-width">
                <div className="col-left gap-12 full-width">
                    <p className={"text-primary-label"}>Order status</p>
                    <SearchSelect list={getEnumNames(orderStatusTypes)}
                                  defaultValue={status} handleSelected={changeStatus}/>
                </div>
                <div className="col-left gap-12 full-width">
                    <p className={"text-primary-label"}>Delivery</p>
                    <SearchSelect list={getEnumNames(deliveryTypes)} handleSelected={addDelivery}/>
                </div>
                <div className="col-left gap-12 full-width">
                    <p className={"text-primary-label"}>Payment</p>
                    <SearchSelect list={getEnumNames(paymentTypes)} handleSelected={addPayment}/>
                </div>
            </div>
            <div className="row-left gap-24 full-width">
                <div className="col-left gap-12 flex-2">
                    <div className="row-left full-width">
                        <p className={"text-primary-label flex-1"}>Discount</p>
                        <div className="flex-1"/>
                        <div className="flex-1">
                            <InputNumber min={0} max={totalPrice - 1} valueSate={discount}
                                         onChangeCallback={changeDiscount}/>
                        </div>
                    </div>
                    <div className="row-left full-width">
                        <p className={"text-primary-label  flex-1"}>Paid</p>
                        <div className="flex-1">
                            <Button buttonText={"Paid"} onClickFunc={() => changePaid(totalPrice)}/>
                        </div>
                        <div className="flex-1">
                            <InputNumber min={0} max={totalPrice} valueSate={paid}
                                         onChangeCallback={changePaid}/>
                        </div>
                    </div>
                </div>
                <div className="row-left gap-24 flex-1">
                    <div className="col-left gap-12 flex-1">
                        <p className={"text-primary-label"}>Total price</p>
                        <p className="text-h3--bold">{totalPrice}</p>
                    </div>
                    <div className="col-left gap-12 flex-1">
                        <p className={"text-primary-label"}>For pay</p>
                        <p className="text-h3--bold">{totalPrice - paid}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OrderSummary