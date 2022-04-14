import {createRef, useEffect, useState} from "react";
import DropDownResult from "../DropDownResult/DropDownResult";
import "./SearchSelect.css"
import SelectedItem from "../SelectedItem/SelectedItem";
import Button from "../Button/Button";

const SearchSelect = ({list = [], handleSelected, defaultValue, clearSelected, isFullWidth = false}) => {
    const [isDropDownVisible, setIsDropDownVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState(defaultValue ? defaultValue : null)
    const [resultList, setResultList] = useState(null)
    const [inputValue, setInputValue] = useState("")
    const inputRef = createRef()

    const setSelected = (item) => {
        setSelectedItem(item)
        setIsDropDownVisible(false)
        setResultList(null)
    }

    useEffect(() => {
        if (inputValue) {
            let result = list?.filter(item => {
                return item?.name?.toUpperCase().includes(inputValue.toUpperCase()) ||
                    item.lastName?.toUpperCase().includes(inputValue.toUpperCase()) ||
                    item.title?.toUpperCase().includes(inputValue.toUpperCase()) ||
                    item.phone?.toUpperCase().includes(inputValue.toUpperCase()) ||
                    item.email?.toUpperCase().includes(inputValue.toUpperCase())
            })
            if (result?.length > 0) {
                setIsDropDownVisible(true)
                setResultList(result)
            }
        }
    }, [inputValue])

    const onButtonClick = () => {
        setResultList(null)
        setIsDropDownVisible(!isDropDownVisible)
    }

    useEffect(() => {
        if (handleSelected) {
            handleSelected(selectedItem)
            setResultList(null)
        } else {
            console.error("Function for handle result is undefined")
        }
    }, [selectedItem])

    return (
        <div className="select-cnt row-vertical-center full-width gap-12" onClick={() => onButtonClick()}>
            {
                selectedItem != null && !clearSelected ?
                    <SelectedItem item={selectedItem} deleteItem={() => setSelectedItem(null)}/>
                    :
                    <input type="text"
                           ref={inputRef}
                           className="select--input full-width"
                           placeholder="Start type to search"
                           value={inputValue}
                           onInput={(event) => setInputValue(event?.target.value)}
                    />
            }

            <Button onClickFunc={onButtonClick} type={"drop"}/>

            {isDropDownVisible && <DropDownResult list={resultList ? resultList : list}
                                                  isFullWidth={isFullWidth}
                                                  setIsVisibleFunc={setIsDropDownVisible}
                                                  setSelectedItemFunc={setSelected}/>}

        </div>
    )
}

export default SearchSelect