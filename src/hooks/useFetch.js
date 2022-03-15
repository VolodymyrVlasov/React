import {useState} from "react";
import {createOrder, getOrders, updateOrder} from "../api/orderApi";
import {
    createCustomer,
    getCustomers,
    getManagerByUid,
    searchCustomersByKey,
    searchCustomersByRole
} from "../api/customerApi";
import {createProduct, getProducts, updateProduct} from "../api/productApi";
import {getDeliveryTypes, getOrderStatusTypes, getPaymentTypes, getProductTypes, getRoleTypes} from "../api/typesApi";

const useFetch = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const setResult = (err, data) => {
        if (!err) {
            setData(data)
        } else {
            setData(null)
        }
        if (err) {
            setError(err)
        } else {
            setError(null)
        }
    }

    const fetchData = async (type, payload) => {
        setLoading(true)
        switch (type) {
            case 'createCustomer': {
                const [err, data] = await createCustomer(payload)
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
            case 'getManagerByUid': {
                const [err, data] = await getManagerByUid(payload)
                setResult(err, data)
                break
            }

            case 'createOrder': {
                const [err, data] = await createOrder(payload);
                setResult(err, data)
                break
            }
            case 'getOrders': {
                const [err, data] = await getOrders();
                setResult(err, data)
                break
            }
            case "updateOrder": {
                const [err, data] = await updateOrder(payload)
                setResult(err, data)
                break
            }

            case 'createProduct': {
                const [err, data] = await createProduct(payload);
                setResult(err, data)
                break
            }
            case 'getProducts': {
                const [err, data] = await getProducts();
                setResult(err, data)
                break
            }
            case "updateProduct": {
                const [err, data] = await updateProduct(payload)
                setResult(err, data)
                break
            }

            case "getPaymentTypes": {
                const [err, data] = await getPaymentTypes()
                setResult(err, data)
                break
            }
            case "getRoleTypes": {
                const [err, data] = await getRoleTypes()
                setResult(err, data)
                break
            }
            case "getDeliveryTypes": {
                const [err, data] = await getDeliveryTypes()
                setResult(err, data)
                break
            }
            case "getOrderStatusTypes": {
                const [err, data] = await getOrderStatusTypes()
                setResult(err, data)
                break
            }
            case "getProductTypes": {
                const [err, data] = await getProductTypes()
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
