import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading/Loading";
import {useEffect, useState} from "react";
import {useTasks} from "../../hooks/useTasks";
import TaskCard from "../../components/TaskCard/TaskCard";
import Popup from "reactjs-popup";

const Dashboard = () => {

    // const [isPopup, setIsPopup] = useState(false)
    const {data, error, loading, fetchData} = useFetch()
    const [{tasks, makers, searchParams}, dispatch] = useTasks()

    useEffect(() => fetchData("getAllTodos"), [])

    useEffect(() => {
        !error && dispatch({type: "updateTaskList", payload: data})
    }, [data, error])

    if (loading) return (<Loading/>)



    return (
        <section className="container">


            {tasks != null && tasks.map((t, i) => <TaskCard key={i} order={t}/>)}
        </section>
    )
}

export default Dashboard