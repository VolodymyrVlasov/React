import {createContext, useEffect, useState} from "react";

export const TodosContext = createContext([])

const TodosProvider = ({children}) => {
    const [todos, setTodos] = useState([])

    const addTodo = (newTodo) => {
        setTodos([...todos, newTodo])
    }

    useEffect(() => {
    }, [todos])
    return (
        <TodosContext.Provider value={[todos, addTodo]}>{children}</TodosContext.Provider>
    )
}

export default TodosProvider