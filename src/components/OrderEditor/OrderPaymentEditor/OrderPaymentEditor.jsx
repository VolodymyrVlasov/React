import {useOrder} from "../../../hooks/useOrder";
import {useEffect, useState} from "react";
import InputLabel from "../../InputLabel/InputLabel";

const OrderPaymentEditor = () => {
    const [{totalPrice, paid, discount}, dispatch] = useOrder()
    const [forPay, setForPay] = useState(0)

    useEffect(() => {
        let fp = Number(totalPrice) - Number(paid) - Number(discount)
        setForPay(fp)
    }, [paid, totalPrice, discount])

    const changeDiscount = (value) => {
        if (value < totalPrice && (totalPrice - paid) !== 0) {
            dispatch({type: "addDiscount", payload: value})
        }
    }

    const changePaid = (value) => {
        if (value > 0 && value <= totalPrice) {
            dispatch({type: "addPaid", payload: value})
        }
    }

    return (
        <section className="col-left full-width gap-24">
            <div className="row-left gap-8 full-width">
                <div className=" col-left gap-8 flex-1">
                    <p className="text-primary-label">Discount</p>
                    <InputLabel callback={changeDiscount}
                                value={discount}
                                inputType={"number"}
                                min={0}
                                max={(totalPrice - paid)}/>
                </div>
                <div className=" col-left gap-8 flex-1">
                    <p className="text-primary-label">Paid</p>
                    <InputLabel callback={changePaid}
                                value={paid}
                                inputType={"number"}
                                min={0}
                                max={(totalPrice - discount)}/>
                </div>
                <div className=" col-left gap-8 flex-1">
                    <p className="text-primary-label">Total price</p>
                    <p className="text-h2">{totalPrice}</p>
                </div>
                <div className=" col-left gap-8 flex-1">
                    <p className="text-primary-label">For pay</p>
                    <p className="text-h2--bold">{forPay}</p>
                </div>
            </div>
        </section>
    )
}

export default OrderPaymentEditor


