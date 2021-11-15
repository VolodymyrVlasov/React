const Todo = ({todo}) => {
    return (
        <div className="col-sm-12 col-md-6 col-xl-4 py-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{todo.title}</h5>
                    <p className="card-text">{todo.body}</p>
                    <button className="btn btn-primary">Complete</button>
                </div>
            </div>
        </div>
    )
}
export default Todo