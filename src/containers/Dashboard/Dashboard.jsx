import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading/Loading";
import {useEffect} from "react";
import {useTasks} from "../../hooks/useTasks";
import TaskCard from "../../components/TaskCard/TaskCard";

const Dashboard = () => {
    const {data, error, loading, fetchData} = useFetch()
    const [{tasks, makers, searchParams}, dispatch] = useTasks()

    useEffect(() => fetchData("getAllTodos"), [])

    useEffect(() => {
        !error && dispatch({type: "updateTaskList", payload: data})
        console.log(error, data)

    }, [data, error])

    if (loading) return (<Loading/>)

    return (
        <section className="container">
            {tasks.map((t, i) => <TaskCard key={i} order={t}/>)}
        </section>
    )
}

export default Dashboard