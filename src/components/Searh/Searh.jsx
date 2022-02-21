import "./Searh.css"
import {useTasks} from "../../hooks/useTasks";
import {useRef, useState} from "react";

const Search = ({onSearchQueryCallback}) => {
    const searchCnt = useRef(null)
    const [{searchQuery}, dispatch] = useTasks()
    const [borderStyle, setBorderStyle] = useState("")
    let delayedSearch

    const addToSearchParams = (e) => {
        let searchQuery = e?.target?.value
        clearTimeout(delayedSearch)
        if (searchQuery === "") {
            setBorderStyle("")
            searchQuery = null
        }

        if (searchQuery) {
            if (searchQuery.length > 0 && searchQuery.length < 2) {
                setBorderStyle("search-warn")
                dispatch({type: "addToSearchParams", payload: null})
                return
            }
            if (searchQuery.length >= 2) {
                setBorderStyle("search-allow")
                delayedSearch = setTimeout(() => {
                    onSearchQueryCallback && onSearchQueryCallback(searchQuery)
                    dispatch({type: "addToSearchParams", payload: searchQuery})
                }, 500)
                return;
            }
        }

        if (searchQuery == null) {
            dispatch({type: "addToSearchParams", payload: searchQuery})
        }
    }

    return (
        <div className={`search ${borderStyle}`} ref={searchCnt}>
            <i className="search-ico"/>
            <input onInput={(e) => {
                addToSearchParams(e)
            }}
                   type="text" className={"search-input"}
                   placeholder="Номер заказа, товар или номер телефона заказчика..."/>
        </div>
    )
}


export default Search