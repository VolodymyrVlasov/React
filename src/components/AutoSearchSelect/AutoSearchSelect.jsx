import {useEffect, useState} from "react";
import "./AutoSearchSelect.css"
import AddCustomer from "../AddCustomer/AddCustomer";
import SearchCustomer from "../SearchCustomer/SearchCustomer";
import SelectedItem from "../SelectedItem/SelectedItem";
import {useOrder} from "../../hooks/useOrder";
import useFetch from "../../hooks/useFetch";

const AutoSearchSelect = () => {
    const [, dispatch] = useOrder()
    const [customer, setCustomer] = useState(null)
    const [isNewCustomer, setIsNewCustomer] = useState(false)

    const {data: createdCustomer, fetchData: fetchCustomers} = useFetch()

    const handleCustomer = () => setIsNewCustomer(!isNewCustomer)

    const addCustomer = (customer) => setCustomer(customer)

    const createCustomer = (customer) => fetchCustomers('addCustomer', customer)

    const deleteCustomer = () => setCustomer(null)

    useEffect(() => addCustomer(createdCustomer), [createdCustomer])

    useEffect(() => dispatch({type: "addCustomer", payload: customer}), [customer])

    return (
        <div className="auto-search" id="auto-search-customer">
            {customer && <SelectedItem item={customer} deleteItem={deleteCustomer}/>}
            {!customer && (
                <>
                    {isNewCustomer && <AddCustomer addCustomer={createCustomer} setIsNewCustomer={setIsNewCustomer}/>}
                    {!isNewCustomer && (
                        <>
                            <SearchCustomer selectedCustomer={addCustomer}/>
                            <button className="auto-search--btn-add" onClick={() => handleCustomer()}>
                                +
                            </button>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default AutoSearchSelect

