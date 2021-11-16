import {createContext, useEffect, useReducer} from "react";

const LC_KEY = "todos"

export const TodosContext = createContext([])

const initialState = JSON.parse(localStorage.getItem(LC_KEY)) || []

const reducer = (state, {action, payload}) => {
    try {
        switch (action) {
            case "addTodo":
                return [...state, payload]
            case "completeTodo":
                return [...state, payload]
            case "removeTodo":
                return [...state, payload]
            default:
                throw new Error(`Invalid action: ${action}`)
        }
    } catch (error) {
        console.error(error)
    }
}

const TodosProvider = ({children}) => {
    // const [todos, setTodos] = useState([])
    const [state, dispatch] = useReducer(reducer, initialState,)

    // const addTodo = (newTodo) => {
    //     setTodos([...todos, newTodo])
    // }

    useEffect(() => {
        localStorage.setItem(LC_KEY, JSON.stringify(state))
    }, [state])

    return (
        <TodosContext.Provider value={[state, dispatch]}>{children}</TodosContext.Provider>
    )
}

export default TodosProvider