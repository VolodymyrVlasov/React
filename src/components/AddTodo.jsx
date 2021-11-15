import {useState} from "react";
import {useTodos} from "../hooks/useTodo";

const AddTodo = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [todos, setTodo] = useTodos()

    const addTodo = (e) => {
        e.preventDefault()
        setTodo({
            id: Date.now(),
            title,
            body,
            createdAt: Date.now(),
            isCompleted: false,
            editedAt: null
        })
    }

    return (
        <form onSubmit={addTodo} className="row justify-content-center">
            <div className="mb-3 col-8">
                <label htmlFor="title" className="form-label">Email address</label>
                <input type="text" className="form-control" id="title" name={"title"}
                       placeholder="Type title for new todo"
                       onChange={e => setTitle(e.target.value)}/>
            </div>
            <div className="col-8 mb-3">
                <label htmlFor="todo" className="form-label">Example textarea</label>
                <textarea className="form-control" id="todo" rows="3"
                          placeholder={"Type what you need to do"} name={"body"}
                          onChange={e => setBody(e.target.value)}/>
            </div>
            <div className="col-8 mb-3">
                <button type={"submit"} className="btn btn-outline-success">Submit</button>
            </div>
        </form>
    )
}

export default AddTodo