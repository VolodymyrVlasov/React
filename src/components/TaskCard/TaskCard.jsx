import "./TaskCard.css"
import TodoTaskList from "../TaskList/TaskList";
import TodoInfo from "../TodoInfo/TodoInfo";

const TaskCard = ({order}) => {
    return (
        <div className="task col col-gap">
            <div className="row-h-center_v-spb">
                <p className="task--id">{order.orderId}</p>
            </div>
            <TodoInfo order={order}/>
            <TodoTaskList order={order}/>
            {/*<TodoComments task={task}/>*/}
            {/*<div className="row">*/}
            {/*    <RedirectTask task={order}/>*/}
            {/*    <StateButton task={order}/>*/}
            {/*</div>*/}
        </div>
    )
}

export default TaskCard