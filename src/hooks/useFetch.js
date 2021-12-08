import {useState} from "react";
import {getTodoList, getUsers, updateTask} from "../api/api";

const useFetch = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const setResult = (err, data) => {
        if (!err) {
            setData(data)
        }
        if (err) {
            setError(err)
        }
    }

    const fetchData = async (type, payload) => {
        setLoading(true)
        switch (type) {
            case 'getAllTodos': {
                const [err, data] = await getTodoList();
                setResult(err, data)
                break
            }
            case 'getUsers': {
                const [err, data] = await getUsers();
                setResult(err, data)
                break
            }
            case "updateTask":
                const [err, data] = await updateTask(payload)
                setResult(err, data)
                break
            default:
        }
        setLoading(false)
    }

    return {data, error, loading, fetchData};
}

export default useFetch
