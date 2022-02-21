//should return array
// export const search = ({array, key}) => {
//     if (array && key) {
//         const filteredOrders = array.filter(object => {
//             return Object.values(object).some(value => {
//                 if (value != null) {
//                     if (value instanceof Object && !(value instanceof Array)) {
//                         return simplifyToArray({object: value, key})
//                     }
//                     //
//                     // if (value instanceof Array) {
//                     //     console.log("value is array", value)
//                     //
//                     //     value.filter(arrElement => {
//                     //         if (arrElement instanceof Object && !(arrElement instanceof Array)) {
//                     //             console.log("arrElement -> ", value)
//                     //         }
//                     //     })
//                     // }
//
//                     if (typeof value === "string" || typeof value === "number") {
//                         return String(value).toUpperCase().includes(key.toUpperCase())
//                     }
//                     return false
//                 }
//             })
//         })
//
//         if (filteredOrders.length > 0) {
//             return {
//                 resultArray: filteredOrders,
//                 resultMessage: `Founded ${filteredOrders.length} items with key: ${key}`
//             }
//         } else {
//             return {resultArray: array, resultMessage: "No matches"}
//         }
//     }
//     if (key == null || key === "") {
//         return {resultArray: array, resultMessage: `Invalid key: ${key}`}
//     }
//     return console.error("All case was wrong")
// }

const simplifyToArray = (object) => {
    return Object.values(object)?.map(value => value)
}

export const search = ({array, key}) => {

    if (array && key) {
        const filteredOrders = array?.filter(value => {
                if (value instanceof Object && !(value instanceof Array)) {
                    let bool = false

                    const searchInArray = (array) => {
                        for (let e of array) {
                            if (e instanceof Object && !(e instanceof Array)) {
                                searchInArray(simplifyToArray(e))
                            }
                            if (e instanceof Array) {
                                searchInArray(e)
                            }
                            if (e != null && !(e instanceof Object)) {
                                bool = String(e).toUpperCase().includes(key.toUpperCase())
                            }
                            if (bool) {
                                return bool
                            }
                        }
                    }
                    return searchInArray(simplifyToArray(value))
                } else if (value instanceof Array) {
                    value.forEach(e => {
                        if (!(e instanceof Object)) {
                            return String(e).toUpperCase().includes(key.toUpperCase())
                        }
                        return false
                    })
                } else if (typeof value === "string" || typeof value === "number") {
                    return String(value).toUpperCase().includes(key.toUpperCase())
                }
                return false
            }
        )
        console.log("!!!!!!!", filteredOrders)
        if (filteredOrders.length > 0) {
            return {
                resultArray: filteredOrders,
                resultMessage: `Founded ${filteredOrders.length} items with key: ${key}`
            }
        } else {
            return {resultArray: array, resultMessage: "No matches"}
        }
    }
    if (key == null || key === "") {
        return {resultArray: array, resultMessage: `Invalid key: ${key}`}
    }

    return console.error("All case was wrong")

}
