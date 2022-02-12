import {useEffect, useState} from "react";
import {
    addCustomer,
    createOrder,
    getCustomers,
    getTasks,
    getTaskTypes,
    getUsers,
    searchCustomersByKey, searchCustomersByRole,
    updateTask
} from "../api/api";

const useFetch = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const setResult = (err, data) => !err ? setData(data) : setError(err)

    const fetchData = async (type, payload) => {
        setLoading(true)
        switch (type) {
            case 'createOrder': {
                const [err, data] = await createOrder(payload);
                setResult(err, data)
                break
            }
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
            case 'addCustomer': {
                const [err, data] = await addCustomer(payload)
                setResult(err, data)
                break
            }
            case 'searchCustomersByKey': {
                const [err, data] = await searchCustomersByKey(payload)
                setResult(err, data)
                break
            }
            case 'searchCustomersByRole': {
                const [err, data] = await searchCustomersByRole(payload)
                setResult(err, data)
                break
            }
            case 'getCustomers': {
                const [err, data] = await getCustomers()
                setResult(err, data)
                break
            }

            case "updateTask": {
                const [err, data] = await updateTask(payload)
                setResult(err, data)
                break
            }
            case "taskTypes":
                const [err, data] = await getTaskTypes()
                setResult(err, data)
                break
            default:
                setResult(new Error(`Type "${type}" not found`))
        }
        setLoading(false)
    }
    return {data, error, loading, fetchData};
}

export default useFetch
