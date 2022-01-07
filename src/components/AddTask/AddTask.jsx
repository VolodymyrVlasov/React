import Button from "../Button/Button";
import {useEffect, useState} from "react";
import SearchSelect from "../SearchSelect/SearchSelect";
import SelectedItem from "../SelectedItem/SelectedItem";
import useFetch from "../../hooks/useFetch";
import FormRowWrapper from "../FormRowWrapper/FormRowWrapper";
import {useOrder} from "../../hooks/useOrder";

const AddTask = () => {
    const [state, dispatch] = useOrder()
    const fetchTaskTypes = useFetch()
    const [tasks, setTasks] = useState([])
    const [taskTypes, setTaskTypes] = useState(fetchTaskTypes.data)

    useEffect(() => {
        fetchTaskTypes.fetchData("taskTypes")
    }, [])

    useEffect(() => {
        if (fetchTaskTypes.data && fetchTaskTypes.data.length > 0) {
            setTaskTypes(fetchTaskTypes.data)
        }
    }, [fetchTaskTypes.data])

    useEffect(() => {
        dispatch({type: "addTasks", payload: tasks})

    }, [tasks])

    const onRemoveBtnClick = (id) => {
        const filteredTasks = tasks.filter(task => task.item.id !== String(id))
        filteredTasks.length === 0 ? setTasks([]) : setTasks(filteredTasks)
    }

    const addNewTask = (task) => {
        let index = tasks.findIndex(taskFromState => taskFromState.item.id === task.item.id)

        if (tasks.length === 0) {
            setTasks([task])

        } else if (index > -1) {
            const editedTask = {
                "item": tasks[index].item,
                "amount": Number(task?.amount) + Number(tasks[index].amount),
                "totalPrice": Number(tasks[index].totalPrice) + Number(task.totalPrice)
            }
            const tasksWithMerged = [...tasks]
            tasksWithMerged.splice(index, 1, editedTask)
            setTasks(tasksWithMerged)

        } else {
            setTasks(prevState => [...prevState, task])
        }
    }

    return (
        <>
            <TaskForm list={taskTypes} addTaskFunk={addNewTask}/>
            {tasks.map((task, index) =>
                <Task key={index} task={task} removeTaskFunk={onRemoveBtnClick}/>)}
        </>
    )
}

export default AddTask


const Task = ({task, removeTaskFunk}) => {
    if (task.item.id !== undefined) {
        return (
            <div className="row-h-center_v-spb">
                <SelectedItem item={task?.item}/>
                <div>{task?.amount}</div>
                <div>{task?.totalPrice}</div>
                <Button onClickFunc={() => removeTaskFunk(task.item.id)} buttonText={"remove"}/>
            </div>
        )
    }
    return (<div className="row-h-center_v-spb">NO ID</div>)
}


const TaskForm = ({list, addTaskFunk}) => {
    const [item, setItem] = useState(null)
    const [amount, setAmount] = useState(1)
    const [totalPrice, setTotalPrice] = useState(null)
    const [task, setTask] = useState(null)
    const [clear, setClear] = useState()

    const setSelectedItem = (item) => setItem(item)

    const onAmountChange = (value) => item && setAmount(Number(value))

    const addTask = () => {
        task && addTaskFunk(task)
        setTask(null)
        setItem(null)
        setClear(true)
    }

    useEffect(() => {
        if (amount && item) {
            setTotalPrice(item?.price[0] * amount)
        }
    }, [item, amount])

    useEffect(() => {
        if (item && amount && totalPrice) {
            setTask({item, amount, totalPrice})
        }
        setClear(false)
    }, [item, amount, totalPrice])

    return (
        <FormRowWrapper callback={addTask} buttonType={"add"}>
            <SearchSelect list={list} handleSelected={setSelectedItem} clearSelected={clear}/>
            {item &&
            <input type="text" min={"1"}
                   onChange={(event) => onAmountChange(event?.target?.value)}
                   value={amount}/>}
            {item && <div>{totalPrice}</div>}
        </FormRowWrapper>
    )
}