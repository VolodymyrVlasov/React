
//should return array
export const search = ({array, key}) => {
    if (array && key) {
        const filteredOrders = array.filter(object => {
            return Object.values(object).some(value => {
                if (value != null) {
                    // if (value instanceof Object && !(value instanceof Array)) {
                    //     // console.log("object -> ", value)
                    // }
                    //
                    // if (value instanceof Array) {
                    //     console.log("value is array", value)
                    //
                    //     value.filter(arrElement => {
                    //         if (arrElement instanceof Object && !(arrElement instanceof Array)) {
                    //             console.log("arrElement -> ", value)
                    //         }
                    //     })
                    // }

                    if (typeof value === "string" || typeof value === "number") {
                        return String(value).toLowerCase().includes(key.toLowerCase())
                    }
                    return false
                }
            })
        })

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