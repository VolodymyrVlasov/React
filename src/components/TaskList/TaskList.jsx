const TaskList = ({taskList, isCollapsed}) => {
    const getTaskList = () => {
        return isCollapsed ? (
                <div className="col">
                    <div className="row-h-center_v-spb">
                        <span className="half text-label">Задача</span>
                        <span className="half text-label">Тираж</span>
                    </div>
                    <ul className="task--tasks-list col col-gap">
                        {taskList.map((task, index) => {
                            return (
                                <li key={index} className="row">
                                    <span className="half">• {task.name}</span>
                                    <div className="half row-h-center_v-spb">
                                        <span>{task.amount} шт</span>
                                        <a className="sm-link-to-folder" href={`file://${task.folder}`}/>
                                    </div>
                                </li>
                            )
                        })
                        }
                    </ul>
                </div>)
            :
            <div>Задачи: {taskList.length} шт</div>
    }

    return (getTaskList())
}

export default TaskList