import {api} from "./api";

const ENDPOINT = '/types'

export const getDeliveryTypes = () => api.get(`${ENDPOINT}/delivery`)

export const getOrderStatusTypes = () => api.get(`${ENDPOINT}/order-status`)

export const getRoleTypes = () => api.get(`${ENDPOINT}/roles`)

export const getProductTypes = () => api.get(`${ENDPOINT}/product-types`)

export const getPaymentTypes = () => api.get(`${ENDPOINT}/payment-types`)

