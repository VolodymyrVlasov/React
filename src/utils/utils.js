import {enumNames} from "../constants/EnumNames"
import {discountPoints} from "../constants/DiscountPoints"

export const getPriceIndexByAmount = (amount) => {
    return discountPoints.findIndex((discountPoint, index) => {
        if (amount <= discountPoint) {
            return true
        } else if (amount >= discountPoints[discountPoints.length - 1] && index === discountPoints.length - 1) {
            return true
        }
    })
}

export const getEnumNames = (enumList) => {
    return enumList?.map(element => Object.entries(enumNames)
        .filter(obj => obj[0] === element))
        .map(arr => ({type: arr[0][0], name: arr[0][1]}))
}

export const formatDate = (raw) => {
    const options = {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "numeric",
        hour12: false
    }
    if (!raw) {
        return "Not edited yet"
    }
    return new Date(raw).toLocaleString("en-gb", options)
}