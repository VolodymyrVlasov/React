import {useAppContext} from "../../hooks/useAppContext";
import {useRef, useState} from "react";

import "./Searh.css"

const Search = ({onSearchQueryCallback, placeholder}) => {
    const searchCnt = useRef(null)
    const [, dispatch] = useAppContext()
    const [borderStyle, setBorderStyle] = useState("")
    let delayedSearch

    const addToSearchParams = (e) => {
        e.preventDefault()
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
        <div className={`row-vertical-center flex-3 gap-8 search ${borderStyle}`} ref={searchCnt}>
            <i className="search-ico"/>
            <input onInput={(e) => addToSearchParams(e)}
                   type="text" className="search-input"
                   placeholder={placeholder && placeholder}/>
        </div>
    )
}

export default Search