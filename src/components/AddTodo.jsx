const AddTodo = () => {

    const addTodo = (e) => {
        e.preventDefault()
        console.log(e)
    }

    return (
        <form onSubmit={e => addTodo(e)}>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" name={"title"}/>
            <label htmlFor="todo">Body</label>
            <input id="todo" type="text" name={"title"}/>
            <button onSubmit={e => addTodo(e)}>Add</button>
        </form>
    )
}

export default AddTodo