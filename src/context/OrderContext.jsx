import {createContext, useEffect, useReducer} from "react";

const initialState = {
    orderId: null,
    author: {},
    customer: {},
    manager: {},
    maker: {},
    cartItems: [],
    paid: 0,
    discount: 0,
    totalPrice: 0,
    deliveryType: "",
    paymentType: "",
    status: "",
    comments: [],
    createdDate: "",
    editedDate: "",
    finishedDate: ""
}

// const [{orderId, manager, maker, customer, createdDate, editedDate, finishedDate, deliveryType, paymentType,status}, dispatch] = useOrder()

export const OrderContext = createContext(initialState)

const reducer = (state, {type, payload}) => {
    try {
        switch (type) {
            case "addOrderId":
                return {...state, orderId: payload}
            case "addCustomer":
                return {...state, customer: payload}
            case "addManager":
                return {...state, manager: payload}
            case "addAuthor":
                return {...state, author: payload}
            case "addMaker":
                return {...state, maker: payload}
            case "addCartItems":
                return {...state, cartItems: payload}
            case "addCartItem":
                return {...state, cartItems: [...state.cartItems, payload]}
            case "removeCartItemById":
                const cartItems = [...state.cartItems]
                cartItems.splice(payload, 1)
                return {...state, cartItems: cartItems}
            case "addDiscount":
                return {...state, discount: payload}
            case "addDeliveryType":
                return {...state, deliveryType: payload}
            case "addPaymentType":
                return {...state, paymentType: payload}
            case "addPaid":
                return {...state, paid: payload}
            case "addTotalPrice":
                return {...state, totalPrice: payload}
            case "addStatus":
                return {...state, status: payload}
            case "addComment":
                return {...state, comments: [payload]}
            case "addFinishedDate":
                return {...state, finishedDate: payload}
            case "fillOrder":
                return payload
            default:
                console.error(`Invalid action in Order Context: ${{type, payload}}`)
        }
    } catch (error) {
        console.error(error)
    }
}

const OrderProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // useEffect(() => {
    //     console.dir(state)
    // }, [state])

    return (
        <OrderContext.Provider value={[state, dispatch]}>{children}</OrderContext.Provider>
    )
}

export default OrderProvider