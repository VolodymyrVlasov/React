import {api} from "./api"

const ENDPOINT = '/orders'

export const createOrder = (payload) => api.post(ENDPOINT, payload)

export const getOrders = () => api.get(ENDPOINT)

export const getOrderById = (id) => api.get(ENDPOINT, id)

export const updateOrder = (payload) => api.patch(ENDPOINT, payload)

export const deleteOrderById = (id) => api.delete(ENDPOINT, id)

export const deleteAllOrders = () => api.delete(ENDPOINT)

export const searchOrdersByKey = (key) => api.get(`${ENDPOINT}/key=${key}`)

