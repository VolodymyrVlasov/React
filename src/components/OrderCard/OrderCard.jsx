import {getEnumNames} from "../../utils/utils";
import "./OrderCard.css"
import {Link} from "react-router-dom";

export const OrderCard = ({order}) => {

    const getProductTagSet = (array) => {
        return Array.from(new Set(array.map(e => e.product.productType)))
            .map(e => getEnumNames([e])[0]["name"])
    }

    return (
        <div
            className="theme-card order-card col-left gap-12" draggable={true}>
            <Link className="text-h4--bold"
                  to={`/orders/order/${order.orderId}`}>
                <p>Order #{order.orderId}</p>
            </Link>
            <div className="col-left gap-8">
                <p className="text-secondary-label">To do types</p>
                <div className="row-left wrap gap-8">{
                    getProductTagSet(order.cartItems).map((cartItem, index) => {
                        return (<span key={index} className="item-tag">{cartItem}</span>)
                    })}
                </div>
            </div>
            <div className="col-left gap-8  flex-1">
                <p className="text-secondary-label">Customer</p>
                <div className="row-left wrap gap-8">
                    <span className="item-tag">{order?.customer?.name} {order?.customer?.lastName}</span>
                </div>
            </div>
            <div className="row-left gap-12 full-width">
                <div className="col-left gap-8 flex-1">
                    <p className="text-secondary-label">Delivery</p>
                    <div className="row-left wrap gap-8">
                        {order?.deliveryType &&
                        <span className="item-tag">{getEnumNames([order?.deliveryType])[0]["name"]}</span>}
                    </div>
                </div>
                <div className="col-left gap-8 flex-1">
                    <p className="text-secondary-label">Payment</p>
                    <div className="row-left wrap gap-8">
                        {order?.paymentType &&
                        <span className=" item-tag">{getEnumNames([order?.paymentType])[0]["name"]}</span>}
                    </div>
                </div>
            </div>
            <div className="col-left gap-8 flex-1">
                <p className="text-secondary-label">Status</p>
                <div className="row-left wrap gap-8">
                    <span className="item-tag">{getEnumNames([order?.status])[0]["name"]}</span>
                </div>
            </div>
        </div>
    )
}