const axios = require("axios");

const CUSTOMER_ENDPOINT = '/customers'

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {'Content-type': 'application/json;charset=utf-8'},
})

const apiFr = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {'Content-type': 'application/json;charset=utf-8'},
})

api.interceptors.response.use(
    (res) => [null, res.data],
    (err) => [err, null]
)

apiFr.interceptors.response.use(
    (res) => [null, res.data],
    (err) => [err, null]
)

export const createOrder = (order) => {
    return api.post("/orders", order);
}

export const getTasks = () => {
    return api.get("/orders");
}

export const updateTask = (task) => {
    return api.patch("/orders", task)
}

export const getUsers = () => {
    return api.get(CUSTOMER_ENDPOINT)
}

export const addCustomer = (customer) => {
    return api.post(CUSTOMER_ENDPOINT, customer)
}

export const getCustomers = () => {
    return api.get(CUSTOMER_ENDPOINT)
}

export const searchCustomersByKey = (key) => {
    return api.get(`${CUSTOMER_ENDPOINT}/key=${key}`)
}

export const searchCustomersByRole = (role) => {
    return api.get(`${CUSTOMER_ENDPOINT}/role=${role}`)
}

export const getTaskTypes = () => {
    return api.get("/items")
}

