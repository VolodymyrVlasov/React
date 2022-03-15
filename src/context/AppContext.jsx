import {createContext, useReducer} from "react";
import {MANAGER} from "../constants/StorageKey";

export const AppContext = createContext(null)

const initialState = {
    orders: [],
    makers: null,
    manager: null,
    isNewTaskPopup: false,
    searchQuery: '',
    sortParams: {
        key: 'state',
        order: 1
    }
};

const reducer = (state, {type, payload}) => {
    try {
        switch (type) {
            case 'setManager':
                return {...state, manager: payload}
            case "updateOrderList":
                return {...state, orders: payload}
            case "addTask":
                return {...state, orders: [...state.orders, payload]}
            case "updateTask":
                const index = state.orders.findIndex(payload.id)
                const updatedTaskList = state.orders.splice(index, 1)
                updatedTaskList.push(payload)
                return {...state, tasks: updatedTaskList}
            case "updateMakers":
                return {...state, makers: payload}
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

    // useEffect(() => {
    //     // console.clear()
    //     console.log("searchQuery", appContext.searchQuery)
    // }, [appContext.searchQuery])
    return (
        <AppContext.Provider value={[appContext, appDispatch]}>{children}</AppContext.Provider>
    )
}

export default TasksProvider