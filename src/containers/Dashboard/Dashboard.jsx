import TaskCard from "../../components/TaskCard/TaskCard";
import {useTodos} from "../../hooks/useTodos";

const Dashboard = () => {
    // const {todoList, error, loading} = useFetch("getAllTodos")
    const [{items, searchQuery}, dispatch] = useTodos()

    return (
        <section>
            {/*{loading ? <Loading/> : getTaskCards()}*/}
            {items.map((task, index) => <TaskCard key={index} task={task}/>)}
        </section>
    )
}

export default Dashboard