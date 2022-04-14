import {createContext, useReducer} from "react";

export const AppContext = createContext(null)

const initialState = {
    manager: null,
    orders: [],
    makers: null,
    managers: null,
    paymentTypes: null,
    orderStatusTypes: null,
    deliveryTypes: null,
    isNewTaskPopup: false,
    searchQuery: '',
    sortParams: {
        key: 'state',
        order: 1
    }
}

const reducer = (state, {type, payload}) => {
    try {
        switch (type) {
            case 'setManager':
                return {...state, manager: payload}
            case 'setOrders':
                return {...state, orders: payload}
            case 'setOrderStatusTypes':
                return {...state, orderStatusTypes: payload}
            case "addTask":
                return {...state, orders: [...state.orders, payload]}
            case "updateTask":
                const index = state.orders.findIndex(payload.id)
                const updatedTaskList = state.orders.splice(index, 1)
                updatedTaskList.push(payload)
                return {...state, orders: updatedTaskList}

            case "addMakers":
                return {...state, makers: payload}
            case "addManagers":
                return {...state, managers: payload}
            case "addPaymentType":
                return {...state, paymentTypes: payload}
            case "addStatus":
                return {...state, orderStatusTypes: payload}
            case "addDeliveryType":
                return {...state, deliveryTypes: payload}

            case "addToSearchParams":
                return {...state, searchQuery: payload}
            case "changeNewTaskPopup":
                return {...state, isNewTaskPopup: !state.isNewTaskPopup}
            default:
                return new Error(`Invalid action: ${{type, payload}}`)
        }
    } catch (error) {
        console.error(error)
    }
}

const TasksProvider = ({children}) => {
    const [appContext, appDispatch] = useReducer(reducer, initialState)

    return (
        <AppContext.Provider value={[appContext, appDispatch]}>{children}</AppContext.Provider>
    )
}

export default TasksProvider