import {getEnumNames} from "../../utils/utils";
import "./OrderCard.css"

export const OrderCard = ({order}) => {

    const getProductTagSet = (array) => {
        return Array.from(new Set(array.map(e => e.product.productType)))
            .map(e => getEnumNames([e])[0]["name"])
    }

    return (
        <div className="order_card col col-gap">
            <p className="text">Order #{order.orderId}</p>
            <div>
                <p className="text-label">To do types</p>
                <div className="row-wrap gap-8">{
                    getProductTagSet(order.cartItems).map((cartItem, index) => {
                        return (<span key={index} className="order_card-cart_item_tag">{cartItem}</span>)
                    })}
                </div>
            </div>
            <div>
                <p className="text-label">Delivery</p>
                <div className="row">
                    {order?.deliveryType &&
                        <span
                            className="order_card-cart_item_tag">
                            {getEnumNames([order?.deliveryType])[0]["name"]}</span>}
                </div>
            </div>
            <div>
                <p className="text-label">Payment</p>
                <div className="row gap-8">
                    {order?.paymentType &&
                        <span
                            className="order_card-cart_item_tag">{getEnumNames([order?.paymentType])[0]["name"]}</span>}
                </div>
            </div>
        </div>
    )
}