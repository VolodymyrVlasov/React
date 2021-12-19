import {useEffect, useState} from "react";
import "./AutoSearchSelect.css"
import AddCustomer from "../AddCustomer/AddCustomer";
import SearchCustomer from "../SearchCustomer/SearchCustomer";

const SelectCustomer = () => {
    const [customer, setCustomer] = useState(null)
    const [isNewCustomer, setIsNewCustomer] = useState(false)

    const handleCustomer = () => {
        setIsNewCustomer(!isNewCustomer)
    }

    const addCustomer = (customer) => {
        // todo: add customer to order context
        console.log(customer)
    }


    useEffect(() => {
        console.table(customer)
    }, [customer])

    return (
        <div className="auto-search" id="auto-search-customer">
            {isNewCustomer ? <AddCustomer addCustomer={addCustomer}/> : <SearchCustomer/>}

            <button className="auto-search--btn-add"
                    onClick={() => handleCustomer()}>{isNewCustomer ? "Add" : "+"}</button>
        </div>
    )
}

export default SelectCustomer