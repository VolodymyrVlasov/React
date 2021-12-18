import {useState} from "react";
import {getCustomers, getTasks, getUsers, updateTask} from "../api/api";

const useFetch = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const setResult = (err, data) => !err ? setData(data) : setError(err)

    const fetchData = async (type, payload) => {
        setLoading(true)
        switch (type) {
            case 'getAllTodos': {
                const [err, data] = await getTasks();
                setResult(err, data)
                break
            }
            case 'getUsers': {
                const [err, data] = await getUsers();
                setResult(err, data)
                break
            }
            case 'findCustomers': {
                const [err, data] = await getCustomers(payload)
                setResult(err, data)
                break
            }
            case "updateTask": {
                const [err, data] = await updateTask(payload)
                setResult(err, data)
                break
            }
            default:
                setResult(new Error(`Type "${type}" not found`))
        }
        setLoading(false)
    }
    return {data, error, loading, fetchData};
}

export default useFetch
