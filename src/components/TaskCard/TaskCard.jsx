import "./TaskCard.css"
import RedirectTask from "../RedirectTask/RedirectTask";
import {useEffect, useState} from "react";
import TodoComments from "../Comments/Comments";
import StateButton from "../StateButton/StateButton";
import TodoTaskList from "../TaskList/TaskList";
import TodoInfo from "../TodoInfo/TodoInfo";
import useFetch from "../../hooks/useFetch";

const TaskCard = ({todo}) => {
    const [editedTodo, setEditedTodo] = useState(todo)
    const [isCardFull, setIsCardFull] = useState(false)
    const [taskState, setTaskState] = useState(todo.state)
    const [taskMessages, setTaskMessages] = useState(todo.messages)
    const [taskMaker, setTaskMaker] = useState(todo.maker)
    const [redirectedFrom, setRedirectedFrom] = useState(null)
    const [users, setUsers] = useState([])

    const {data} = useFetch("getUsers")

    useEffect(() => {
        console.log(data?.users)
        setUsers(data?.users)
    }, [data])

    useEffect(() => {
        setEditedTodo(prev => {
            return {
                ...prev,
                state: taskState,
                messages: taskMessages,
                maker: taskMaker
            }
        })
    }, [taskState, taskMessages, taskMaker])

    useEffect(() => {
        console.table(editedTodo)
    }, [editedTodo])

    const addNewMessage = (message) => message !== "" &&
        setTaskMessages(prev => [...prev, {authorName: todo.maker, message: message}])

    const collapseCard = (e) => e.target.id === todo.orderId && setIsCardFull(!isCardFull)

    const setMaker = (newMaker) => {
        setTaskMaker(newMaker)
    }


    return (
        <div id={todo.orderId} onClick={(e) => collapseCard(e)} className="task col col-gap">
            <div className="row-h-center_v-spb">
                <p className="task--id">{todo.orderId}</p>
                <RedirectTask users={users} isCardFull={isCardFull} setMaker={setMaker} maker={taskMaker}/>
            </div>
            {isCardFull && <TodoInfo todo={todo}/>}
            <TodoTaskList taskList={todo.taskList} isCollapsed={isCardFull}/>
            {isCardFull &&
            <TodoComments taskMessages={taskMessages} setTaskMessages={addNewMessage} taskState={taskState}/>}
            <StateButton taskState={taskState} setTaskState={setTaskState}/>
        </div>
    )
}

export default TaskCard