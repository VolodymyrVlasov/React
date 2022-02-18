
//should return array
export const search = ({array, key}) => {
    console.log("searchQuery", searchQuery)
    if (orders && searchQuery && searchQuery !== "") {
        const filteredOrders = orders.filter(order => {
            console.table(order)
            return Object.values(order).some(value => {
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
                        console.info(value, searchQuery)
                        return String(value).toLowerCase().includes(searchQuery.toLowerCase())
                    }
                    return false
                }
            })
        })

        if (filteredOrders.length > 0) {
            setOrdersToRender(filteredOrders)
        }
    }
    if (searchQuery == null || searchQuery === "") {
        setOrdersToRender(orders)
    }

}