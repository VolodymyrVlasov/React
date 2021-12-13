import "./Searh.css"
import {useTasks} from "../../hooks/useTasks";
import {useEffect, useRef} from "react";

const Search = () => {
    const searchCnt = useRef(null)
    const [{searchQuery}, dispatch] = useTasks()
    let delayedSearch

    searchCnt.current.style.border = "1px solid transparent"

    const addToSearchParams = (e) => {
        let searchQuery = e?.target?.value
        clearTimeout(delayedSearch)
        if (searchQuery === "") {
            if (searchQuery.length < 3) {
                searchCnt.current.style.border = "1px solid red"
                return
            }
            searchCnt.current.style.border = "1px solid transparent"
            return
        }
        searchCnt.current.style.border = "1px solid lightgreen"

        delayedSearch = setTimeout(() => {
            dispatch({type: "addToSearchParams", payload: e?.target?.value})
        }, 1000)
    }

    useEffect(() => {
        //todo: call useFetch dispatch function to find some on backend and write it in Context
        console.log("searchQuery -> ", searchQuery)
    }, [searchQuery])

    return (
        <div className="search" ref={searchCnt}>
            <i className="search-ico"/>
            <input onInput={(e) => addToSearchParams(e)}
                   type="text" className="search-input"
                   placeholder="Номер заказа, товар или номер телефона заказчика..."/>
        </div>
    )
}

export default Search