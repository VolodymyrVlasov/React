import {useEffect, useState} from "react";
import "./AutoSearchSelect.css"
import AddCustomer from "../AddCustomer/AddCustomer";
import SearchCustomer from "../SearchCustomer/SearchCustomer";
import SelectedItem from "../SelectedItem/SelectedItem";

const SelectCustomer = () => {
    const [customer, setCustomer] = useState(null)
    const [isNewCustomer, setIsNewCustomer] = useState(false)

    const handleCustomer = () => setIsNewCustomer(!isNewCustomer)

    const addCustomer = (customer) => {
        // todo: VALIDATE
        setCustomer(customer)
    }

    const addNewCustomer = (customer) => {
        // todo: add customer to db
        addCustomer(customer)
    }

    const deleteCustomer = () => {
        setCustomer(null)
    }

    useEffect(() => {
        // todo: add customer to order context
        console.table(customer)
    }, [customer])

    return (
        <div className="auto-search" id="auto-search-customer">
            {!customer ?
                isNewCustomer ?
                    <AddCustomer addCustomer={addNewCustomer} setIsNewCustomer={setIsNewCustomer}/> :
                    <SearchCustomer selectedCustomer={addCustomer}/>
                : <SelectedItem item={customer} deleteItem={deleteCustomer}/>
            }
            {customer ?
                null : isNewCustomer ?
                    null :
                    <button className="auto-search--btn-add" onClick={() => handleCustomer()}>+</button>}
        </div>
    )
}

export default SelectCustomer

