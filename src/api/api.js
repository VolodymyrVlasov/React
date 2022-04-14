const axios = require("axios");

const HOST = 'localhost'
// const HOST = 'paperfox.store'
const PORT = 8080


export const api = axios.create({
    baseURL: `http://${HOST}:${PORT}`,
    headers: {'Content-type': 'application/json;charset=utf-8'},
})

api.interceptors.response.use(
    (res) => [null, res.data],
    (err) => [err, null]
)


