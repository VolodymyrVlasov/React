import {createContext, useReducer} from "react";

const LC_KEY = "todos"

export const TodosContext = createContext([])

const initialState = {
    todos: [],
    searchQuery: '',
    sortParams: {
        key: 'state',
        order: 1
    }
};

const reducer = (state, {type, payload}) => {
    try {
        switch (type) {
            case "addTask":
                return {...state, items: [...state.items, payload]}

            case "updateTask":
                const index = state.items.findIndex(payload.id)
                const updatedTaskList = state.items.splice(index, 1)
                updatedTaskList.push(payload)
                return {...state, items: updatedTaskList}

            default:
                throw new Error(`Invalid action: ${action}`)
        }
    } catch (error) {
        console.error(error)
    }
}

const TodosProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <TodosContext.Provider value={[state, dispatch]}>{children}</TodosContext.Provider>
    )
}

export default TodosProvider