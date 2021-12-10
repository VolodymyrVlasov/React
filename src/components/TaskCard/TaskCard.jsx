import "./TaskCard.css"
import RedirectTask from "../RedirectTask/RedirectTask";
import StateButton from "../StateButton/StateButton";
import TodoTaskList from "../TaskList/TaskList";
import TodoInfo from "../TodoInfo/TodoInfo";

const TaskCard = ({order}) => {
    console.log("TaskCard", order)
    return (
        <div className="task col col-gap">
            <div className="row-h-center_v-spb">
                <p className="task--id">{}</p>

            </div>
            <TodoInfo task={order}/>
            <TodoTaskList task={order}/>
            {/*<TodoComments task={task}/>*/}
            <div className="row">
                <RedirectTask task={order}/>
                <StateButton task={order}/>
            </div>
        </div>
    )
}

export default TaskCard