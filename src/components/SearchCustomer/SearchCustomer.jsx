import {useEffect, useRef, useState} from "react";
import useFetch from "../../hooks/useFetch";

const SearchCustomer = () => {
    let delayedSearch

    const fetchCustomers = useFetch()
    const [query, setQuery] = useState(null)
    const [resultList, setResultList] = useState(null)
    const [isResultDropVisible, setIsResultDropVisible] = useState(false)

    const addToSearchParams = (e) => {
        let searchQuery = e?.target?.value
        clearTimeout(delayedSearch)
        delayedSearch = setTimeout(() => {
            if (searchQuery !== "") {
                setQuery(searchQuery)
            }
            if (searchQuery === "") {
                setResultList([])
                setIsResultDropVisible(false)
            }
        }, 500)
    }

    useEffect(() => {
        if (query && query !== "") {
            fetchCustomers.fetchData("findCustomers", query)
        }
    }, [query])

    useEffect(() => {
        if (fetchCustomers.data && fetchCustomers.data.length > 0) {
            //todo: move it to backend
            let data = fetchCustomers.data
            if (data != null) {
                const searchResult = data.filter(customer => {
                    return (
                        customer.name.includes(query) ||
                        customer.lastname.toLowerCase().includes(query.toLowerCase()) ||
                        customer.phone.replaceAll(" ", "").includes(query.replaceAll(" ", "")) ||
                        customer.email.toLowerCase().includes(query.toLowerCase())
                    )
                })
                setIsResultDropVisible(true)
                if (searchResult != null && searchResult?.length > 0) {
                    setResultList(searchResult)
                }
            }
        }
    }, [fetchCustomers.data])

    return (
        <>
            <input type="text" className="auto-search--input"
                   placeholder="Enter name, lastname, phone or email to search customer or click button to add new"
                   onChange={(e) => addToSearchParams(e)}/>
            {
                isResultDropVisible && resultList != null &&
                <DropDownResult resultList={resultList} changeVisibility={setIsResultDropVisible}/>
            }
        </>
    )
}

export default SearchCustomer


const DropDownResult = ({resultList, changeVisibility}) => {
    const ref = useRef()

    const onOutSideClick = (e) => {
        if (ref.current && !ref.current?.contains(e.target)) {
            changeVisibility(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', onOutSideClick)
        return () => document.removeEventListener('click', onOutSideClick)
    })

    if (resultList.length > 0) {
        return (
            <ul ref={ref} className="auto-search-dropdown">{
                resultList.map((customer, index) => {
                    return (
                        <li key={index} className="auto-search-dropdown--item">
                            {customer.name} {customer.lastname} {customer.phone && customer.phone}
                            {customer.email && customer.email}</li>
                    )
                })
            }
            </ul>
        )
    }

    return (
        <ul className="auto-search-dropdown">
            <li className="auto-search-dropdown--item">No matches</li>
        </ul>
    )
}