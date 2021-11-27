import {useEffect, useState} from "react";
import {getTodoList, getUsers} from "../api/api";

const useFetch = (type) => {
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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            switch (type) {
                case 'getAllTodos': {
                    const [err, data] = await getTodoList();
                    setResult(err, data)
                    break;
                }
                case 'getUsers': {
                    const [err, data] = await getUsers();
                    setResult(err, data)
                    break;
                }
                default:
            }

            setLoading(false)
        }
        fetchData()
    }, [])
    return {data, error, loading};
}

export default useFetch
