import "./SelectCustomer.css"

import Button from "../Button/Button";
import {useEffect, useMemo, useState} from "react";
import CustomerAddForm from "../CustomerAddForm/CustomerAddForm";
import UniSearch from "../UniSearch/UniSearch";
import {useAppContext} from "../../hooks/useAppContext";
import useFetch from "../../hooks/useFetch";
import {useOrder} from "../../hooks/useOrder";

const result = (list) => {
    return list
}

const SelectCustomer = () => {
    const [isAddCustomer, setIsAddCustomer] = useState(false)
    const [customer, setCustomer] = useState(null)

    const {data: createdCustomer, loading: customerLoading, error: customerError, fetchData: customerFetch} = useFetch()
    const {data, error, fetchData} = useFetch()
    const [{searchQuery}, appDispatch] = useAppContext()
    const [order, dispatchOrder] = useOrder()

    useEffect(async () => {
        if (searchQuery) {
            await fetchData("searchCustomersByKey", searchQuery)
        }
        if (createdCustomer) {
            onSelectedItem(createdCustomer)
            setIsAddCustomer(false)
        }
        if (customerError) {
            console.log("customerError", customerError)
        }
    }, [searchQuery, createdCustomer, customerError])

    const resultList = useMemo(() => {
        if (error?.response?.status === 404) {
            return result([])
        }
        return result(data)
    }, [data, error])

    const onSelectedItem = (customer) => {
        setCustomer(customer)
        dispatchOrder({type: "addCustomer", payload: customer})
    }

    return (
        <div className={"select-customer-wrapper row-vertical-center gap-24 full-width"}>
            {isAddCustomer ?
                <CustomerAddForm
                    addCustomer={(customer) => customerFetch('createCustomer', customer)}
                    setIsNewCustomer={setIsAddCustomer}
                    isLoading={customerLoading}
                /> :
                <UniSearch placeholder={"Type to search or press  \"+\"  to create new customer"}
                           resultList={resultList}
                           onSelectItem={onSelectedItem}
                           defaultValue={customer}
                           isDropDown={true} isFullWidthDropDown={true}
                           isShowSelectedItem={true}
                />}
            {!isAddCustomer && !customer &&
            <Button type={"add"} onClickFunc={() => setIsAddCustomer(true)}/>}
        </div>
    )
}

export default SelectCustomer