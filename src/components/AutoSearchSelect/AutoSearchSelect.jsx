import {createRef, useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch";
import "./AutoSearchSelect.css"
import SearchCustomer from "../SearchCustomer/SearchCustomer";

const AutoSearchSelect = () => {
    const [isNewCustomer, setIsNewCustomer] = useState(false)


    return (
        <div className="auto-search" id="auto-search-customer">
            <SearchCustomer/>
            <button className="auto-search--btn-add">+</button>
        </div>
    )
}

export default AutoSearchSelect