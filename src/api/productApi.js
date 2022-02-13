import {api} from "./api"

const ENDPOINT = '/items'

export const createProduct = (payload) => api.post(ENDPOINT, payload)

export const getProducts = () => api.get(ENDPOINT)

export const getProductsById = (id) => api.get(ENDPOINT, id)

export const updateProduct = (payload) => api.patch(ENDPOINT, payload)

export const deleteProduct = (id) => api.delete(ENDPOINT, id)

export const deleteAllProducts = () => api.delete(ENDPOINT)

export const searchProductsByKey = (key) => api.get(`${ENDPOINT}/key=${key}`)