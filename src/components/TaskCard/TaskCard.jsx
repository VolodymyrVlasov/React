import "./TaskCard.css"
import RedirectTask from "../RedirectTask/RedirectTask";
import TodoComments from "../Comments/Comments";
import StateButton from "../StateButton/StateButton";
import TodoTaskList from "../TaskList/TaskList";
import TodoInfo from "../TodoInfo/TodoInfo";

const TaskCard = ({task}) => {

    return (
        <div className="task col col-gap">
            <div className="row-h-center_v-spb">
                <p className="task--id">{task.orderId}</p>
                <RedirectTask task={task}/>
            </div>
            <TodoInfo/>
            <TodoTaskList/>
            <TodoComments/>
            <StateButton/>
        </div>
    )
}

export default TaskCard