import {useOrder} from "../../hooks/useOrder";
import {useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch";
import SelectedItem from "../SelectedItem/SelectedItem";
import CustomerAddForm from "../CustomerAddForm/CustomerAddForm";

import "./SearchWithDropDown.css"
import SearchCustomer from "../SearchCustomer/SearchCustomer";

const SearchWithDropDown = () => {
    const [, dispatch] = useOrder()
    const [customer, setCustomer] = useState(null)
    const [isNewCustomer, setIsNewCustomer] = useState(false)

    const {data: createdCustomer, fetchData: fetchCustomers} = useFetch()

    const handleCustomer = () => setIsNewCustomer(!isNewCustomer)

    const addCustomer = (customer) => setCustomer(customer)

    const createCustomer = (customer) => fetchCustomers('createCustomer', customer)

    const deleteCustomer = () => setCustomer(null)

    useEffect(() => addCustomer(createdCustomer), [createdCustomer])

    useEffect(() => dispatch({type: "addCustomer", payload: customer}), [customer])

    return (
        <div className="customer-search row-left space-between full-width gap-12" id="auto-search-customer">
            {customer && <SelectedItem item={customer} deleteItem={deleteCustomer}/>}
            {!customer && (
                <>
                    {isNewCustomer && <CustomerAddForm addCustomer={createCustomer} setIsNewCustomer={setIsNewCustomer}/>}
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

export default SearchWithDropDown

