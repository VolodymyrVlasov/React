const TaskList = ({task}) => {
    return (
        <div className="col">
            <div className="row-h-center_v-spb">
                <span className="half text-label">Задача</span>
                <span className="half text-label">Тираж</span>
            </div>
            <ul className="task--tasks-list col col-gap">
                {task.tasks.map((task, index) => {
                    return (
                        <li key={index} className="row">
                            <span className="half">• {task.itemName}</span>
                            <div className="half row-h-center_v-spb">
                                <span>{task.amount} шт</span>
                                {task.path != null && <a className="sm-link-to-folder" href={`file://${task.path}`}/>}
                            </div>
                        </li>
                    )
                })
                }
            </ul>
        </div>)
}

export default TaskList