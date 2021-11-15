import {useTodos} from "../hooks/useTodo";
import Todo from "./Todo";

const TodoList = () => {
    const [todos] = useTodos()

    const getTodos = () => {
        // console.log(todos)
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