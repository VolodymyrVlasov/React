import {createContext, useReducer} from "react";

export const OrderContext = createContext({})

const initialState = {
    order: {
        orderId: "",
        customer: {},
        manager: {},
        maker: {},
        tasks: [],
        comments: []
    }
};

const reducer = (state, {type, payload}) => {
    try {
        switch (type) {
            case "addOrderId":
                return {...state, orderId: payload}
            case "addCustomer":
                return {...state, customer: payload}
            case "addManager":
                return {...state, manager: payload}
            case "addMaker":
                return {...state, maker: payload}
            case "addTask":
                return {...state, tasks: [...state.tasks, payload]}
            case "addComment":
                return {...state, comments: [...state.comments, payload]}
            default:
                return new Error(`Invalid action: ${{type, payload}}`)
        }
    } catch (error) {
        console.error(error)
    }
}

const OrderProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <OrderContext.Provider value={[state, dispatch]}>{children}</OrderContext.Provider>
    )
}

export default OrderProvider