import {useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch";
import DropDownResult from "../DropDownResult/DropDownResult";

const SearchCustomer = ({selectedCustomer}) => {
    let delayedSearch
    const {data: customers, fetchData: fetchCustomers} = useFetch()
    const [query, setQuery] = useState(null)
    const [isResultDropVisible, setIsResultDropVisible] = useState(false)

    const addSearchQuery = (e) => {
        let searchQuery = e?.target?.value
        clearTimeout(delayedSearch)
        delayedSearch = setTimeout(() => {
            if (searchQuery) {
                setQuery(searchQuery)
            }
            if (!searchQuery) {
                setQuery(null)
            }
        }, 500)
    }

    useEffect(() => {
        if (query && query !== "") {
            fetchCustomers("searchCustomersByKey", query)
        }
        if (query === "" || query == null) {
            setIsResultDropVisible(false)
        }
    }, [query])

    useEffect(() => {
        setIsResultDropVisible(true)
    }, [customers])

    return (
        <>
            <input type="text" className="auto-search--input"
                   placeholder="Enter name, lastname, phone or email to search customer or click button to add new"
                   onChange={(e) => addSearchQuery(e)}/>
            {
                isResultDropVisible && customers &&
                <DropDownResult list={customers} setIsVisibleFunc={setIsResultDropVisible}
                                setSelectedItemFunc={selectedCustomer}/>
            }
        </>
    )
}

export default SearchCustomer
