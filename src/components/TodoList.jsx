import {useTodos} from "../hooks/useTodo";
import Todo from "./Todo";

const TodoList = () => {
    const [todos,] = useTodos()

    if (!todos?.length > 0) {
        return <h2>No items</h2>
    }

    const getTodos = () => {
        // console.log(typeof todos)
        return Object.values(todos).map((todo) => {
            // console.table(todo)
            return <Todo key={todo.id} todo={todo}/>
        })
    }

    return (
        <div className="row overflow-hidden">
            {getTodos()}
        </div>
    )
}
export default TodoList