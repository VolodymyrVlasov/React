import {createContext, useEffect, useReducer} from "react";

export const TasksContext = createContext([])

const initialState = {
    orders: [],
    makers: [],
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

    useEffect(() => {
        console.log(appContext.isNewTaskPopup)
    }, [appContext.isNewTaskPopup])
    return (
        <TasksContext.Provider value={[appContext, appDispatch]}>{children}</TasksContext.Provider>
    )
}

export default TasksProvider