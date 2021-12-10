const axios = require("axios");

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {'Content-type': 'application/json;charset=utf-8'},
})

api.interceptors.response.use(
    (res) => [null, res.data],
    (err) => [err, null]
)

export const getTasks = () => {
    return api.get("/orders");
}

export const getUsers = () => {
    return api.get("/FakeDB/users.json")
}

export const updateTask = (task) => {
    return api.patch("/orders", task)
}

