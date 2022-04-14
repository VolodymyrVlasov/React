import {useOrder} from "../../../hooks/useOrder";
import {useAppContext} from "../../../hooks/useAppContext";
import SearchSelect from "../../SearchSelect/SearchSelect";
import SelectCustomer from "../../SelectCustomer/SelectCustomer";
import {getEnumNames} from "../../../utils/utils";

const OrderAttributesEditor = () => {
    const [{managers, makers, paymentTypes, orderStatusTypes, deliveryTypes}] = useAppContext()
    const [{manager, maker, customer, deliveryType, paymentType, status}, dispatch] = useOrder()

    const addMaker = maker => dispatch({type: "addMaker", payload: maker})

    const addManager = manager => dispatch({type: "addManager", payload: manager})

    const addDelivery = deliveryType => dispatch({
        type: "addDeliveryType",
        payload: deliveryType ? deliveryType.type : null
    })

    const addPayment = paymentType => dispatch({type: "addPaymentType", payload: paymentType ? paymentType.type : null})

    const addStatus = status => {
        dispatch({type: "addStatus", payload: status ? status.type : null})
    }

    return (
        <section className="col-left gap-24 full-width ">
            <div className="row-left gap-16 full-width">
                <div className=" col-left gap-8 flex-1">
                    <p className="text-primary-label">Manager</p>
                    <SearchSelect list={managers} handleSelected={addManager} defaultValue={manager}/>
                </div>
                <div className=" col-left gap-8 flex-1">
                    <p className="text-primary-label">Maker</p>
                    <SearchSelect list={makers} handleSelected={addMaker} defaultValue={maker}/>
                </div>
            </div>

            <div className="row-left gap-24 full-width">
                <div className=" col-left gap-8 flex-1">
                    <p className="text-primary-label">Customer</p>
                    <SelectCustomer defaultValue={customer}/>
                </div>
            </div>
            <div className="row-left gap-24 full-width">
                <div className=" col-left gap-8 flex-1">
                    <p className="text-primary-label">Delivery</p>
                    <SearchSelect list={deliveryTypes} handleSelected={addDelivery}
                                  defaultValue={deliveryType && getEnumNames([deliveryType])[0]}/>
                </div>
                <div className=" col-left gap-8 flex-1">
                    <p className="text-primary-label">Payment</p>
                    <SearchSelect list={paymentTypes} handleSelected={addPayment}
                                  defaultValue={paymentType && getEnumNames([paymentType])[0]}/>
                </div>
                <div className=" col-left gap-8 flex-1">
                    <p className="text-primary-label">Status</p>
                    <SearchSelect list={orderStatusTypes} handleSelected={addStatus}
                                  defaultValue={status && getEnumNames([status])[0]}/>
                </div>
            </div>
        </section>
    )
}

export default OrderAttributesEditor