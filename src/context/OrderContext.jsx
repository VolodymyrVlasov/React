import {createContext, useEffect, useReducer} from "react";

export const OrderContext = createContext({})

const initialState = {
    // orderId: "",
    customer: {},
    // manager: {},
    maker: {},
    cartItems: [],
    // paid: 0,
    // discount: 0,
    // totalPrice: 0,
    // paymentType: "",
    // path: "",
    // status: "",
    comments: []
}

const reducer = (state, {type, payload}) => {
    try {
        switch (type) {
            case "addCustomer":
                return {...state, customer: payload}
            case "addManager":
                return {...state, manager: payload}
            case "addMaker":
                return {...state, maker: payload}
            case "addCartItems":
                return {...state, cartItems: payload}
            case "addDiscount":
                return {...state, discount: payload}
            case "addDeliveryType":
                return {...state, delivery: payload}
            case "addPaid":
                return {...state, paid: payload}
            case "addComment":
                return {...state, comments: [payload]}
            default:
                return new Error(`Invalid action: ${{type, payload}}`)
        }
    } catch (error) {
        console.error(error)
    }
}

const OrderProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        console.clear()
        console.log(state)
    }, [state])

    return (
        <OrderContext.Provider value={[state, dispatch]}>{children}</OrderContext.Provider>
    )
}

export default OrderProvider