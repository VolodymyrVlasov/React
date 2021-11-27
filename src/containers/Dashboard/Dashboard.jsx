import {useEffect, useState} from "react";
import TaskCard from "../../components/TaskCard/TaskCard";

const Dashboard = () => {
    // const {todoList, error, loading} = useFetch("getAllTodos")
    const [todos, setTodos] = useState([])

    const setTodoList = (arr) => {
        setTodos(arr)
    }

    useEffect(() => {
        fetch("http://localhost:3000/FakeDB/taskList.json")
            .then(response => response.json())
            .then(response => {
                setTodoList(response.taskList)
            })
    }, [])

    // useEffect(() => {
    //     console.log(todoList, error, loading)
    // }, [todoList, error, loading])

    const getTaskCards = () => {
        return todos.map((todo, index) => {
            return <TaskCard key={index} todo={todo}/>
        })
    }

    return (
        <section>
            {/*{loading ? <Loading/> : getTaskCards()}*/}
            {getTaskCards()}
        </section>
    )
}

export default Dashboard