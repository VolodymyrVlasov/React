const axios = require("axios");

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

export const getTasks = () => {
    return api.get("/orders");
}

export const updateTask = (task) => {
    return api.patch("/orders", task)
}

export const getUsers = () => {
    return apiFr.get("/FakeDB/users.json")
}

export const getCustomers = () => {
    return apiFr.get("/FakeDB/customers.json")
}

export const getTaskTypes = () => {
    return apiFr.get("/FakeDB/items.json")
}

