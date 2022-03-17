import "./SearchWithDropDown.css"

import {useOrder} from "../../hooks/useOrder";
import {useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch";
import SelectedItem from "../SelectedItem/SelectedItem";
import CustomerAddForm from "../CustomerAddForm/CustomerAddForm";
import SearchCustomer from "../SearchCustomer/SearchCustomer";

const SearchWithDropDown = () => {
    const [, dispatch] = useOrder()
    const [customer, setCustomer] = useState(null)
    const [isNewCustomer, setIsNewCustomer] = useState(false)
    const {data: createdCustomer, fetchData: fetchCustomers} = useFetch()

    const addCustomer = (customer) => setCustomer(customer)

    useEffect(() => addCustomer(createdCustomer), [createdCustomer])

    useEffect(() => dispatch({type: "addCustomer", payload: customer}), [customer])

    return (
        <div className="customer-search row-left space-between full-width gap-12" id="auto-search-customer">
            {customer &&
            <SelectedItem
                item={customer}
                deleteItem={() => setCustomer(null)}
            />}
            {!customer && (
                <>
                    {isNewCustomer &&
                    <CustomerAddForm
                        addCustomer={(customer) => fetchCustomers('createCustomer', customer)}
                        setIsNewCustomer={setIsNewCustomer}
                    />}
                    {!isNewCustomer && (
                        <>
                            <SearchCustomer selectedCustomer={addCustomer}/>
                            <button className="auto-search--btn-add" onClick={() => setIsNewCustomer(!isNewCustomer)}>
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

