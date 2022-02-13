import {api} from "./api"

const ENDPOINT = '/customers'

export const createCustomer = (payload) => api.post(ENDPOINT, payload)

export const getCustomers = () => api.get(ENDPOINT)

export const getCustomerById = (id) => api.get(ENDPOINT, id)

export const updateCustomer = (payload) => api.patch(ENDPOINT, payload)

export const deleteCustomerById = (id) => api.delete(ENDPOINT, id)

export const deleteAllCustomers = () => api.delete(ENDPOINT)

export const searchCustomersByKey = (key) => api.get(`${ENDPOINT}/key=${key}`)

export const searchCustomersByRole = (role) => api.get(`${ENDPOINT}/role=${role}`)