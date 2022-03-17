import "./UniSearch.css"

import {useAppContext} from "../../hooks/useAppContext";
import {useEffect, useRef, useState} from "react";
import DropDownResult from "../DropDownResult/DropDownResult";
import SelectedItem from "../SelectedItem/SelectedItem";

const UniSearch = ({
                       onSelectItem, resultList, defaultValue,
                       isShowSelectedItem = false,
                       isIcon = false,
                       isDropDown = false,
                       isFullWidthDropDown = false, placeholder
                   }) => {
    const searchCntRef = useRef(null)
    const inputRef = useRef(null)

    const [, dispatch] = useAppContext()
    const [borderStyle, setBorderStyle] = useState("")
    const [selectedItem, setSelectedItem] = useState(defaultValue ? defaultValue : null)
    const [isResultDropVisible, setIsResultDropVisible] = useState()

    let delayedSearch

    useEffect(() => {
        document.addEventListener('click', onOutSideClick)
        return () => document.removeEventListener('click', onOutSideClick)
    }, [])

    const onOutSideClick = (e) => {
        if (searchCntRef.current && !searchCntRef.current?.contains(e.target)) {
            // if (inputRef) {
            //     inputRef.current?.value = ""
            // }
            setBorderStyle("")
        }
    }

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
                    dispatch({type: "addToSearchParams", payload: searchQuery})
                }, 500)
                return;
            }
        }
        if (searchQuery == null) {
            dispatch({type: "addToSearchParams", payload: null})
        }
    }

    const addItem = (item) => {
        setSelectedItem(item)
        onSelectItem(item)
        setIsResultDropVisible(false)
        setBorderStyle("")
    }

    const removeItem = () => {
        if (onSelectItem) {
            setSelectedItem(null)
            onSelectItem(null)
            setIsResultDropVisible(false)
        }
    }

    useEffect(() => {
        if (resultList && !isResultDropVisible) {
            setIsResultDropVisible(true)
        }
    }, [resultList])

    return (
        <div className={`row-vertical-center full-width gap-8 uni-search ${borderStyle}`}
             style={isShowSelectedItem ? {height: "48px"} : {}} ref={searchCntRef}
        >
            {isIcon && <i className="uni-search-ico"/>}
            {isShowSelectedItem && selectedItem && <SelectedItem item={selectedItem} deleteItem={removeItem}/>}
            {!selectedItem &&
            <input ref={inputRef}
                   onInput={(e) => addToSearchParams(e)}
                   type="text" className="uni-search-input"
                   placeholder={placeholder && placeholder}
            />}
            {isDropDown && resultList && isResultDropVisible &&
            <DropDownResult list={resultList}
                            isFullWidth={isFullWidthDropDown}
                            setSelectedItemFunc={addItem}
                            setIsVisibleFunc={setIsResultDropVisible}
            />
            }
        </div>
    )
}

export default UniSearch