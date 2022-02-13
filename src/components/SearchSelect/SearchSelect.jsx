import {createRef, useEffect, useState} from "react";
import DropDownResult from "../DropDownResult/DropDownResult";
import "./SearchSelect.css"
import SelectedItem from "../SelectedItem/SelectedItem";
import Button from "../Button/Button";
import {useOrder} from "../../hooks/useOrder";

const SearchSelect = ({list = [], handleSelected, clearSelected}) => {
    const [, dispatch] = useOrder()
    const [isDropDownVisible, setIsDropDownVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [resultList, setResultList] = useState(null)
    const inputRef = createRef()

    const searchItem = (target) => {
        setIsDropDownVisible(true)
        if (target) {
            let result = list.filter(item => {
                return item?.name?.toLowerCase().includes(target.toLowerCase()) ||
                    item.lastName?.toLowerCase().includes(target.toLowerCase()) ||
                    item.title?.toLowerCase().includes(target.toLowerCase()) ||
                    item.phone?.toLowerCase().includes(target.toLowerCase()) ||
                    item.email?.toLowerCase().includes(target.toLowerCase())
            })
            if (result?.length > 0) {
                setResultList(result)
            }
        }
    }

    const setSelected = (item) => {
        setSelectedItem(item)
        if (inputRef) {
            inputRef.current.value = item?.name
        }
        setIsDropDownVisible(false)
        setResultList(null)
    }

    const onButtonClick = () => {
        if (!isDropDownVisible) {
            setSelectedItem(null)
        }
        setResultList(null)
        setIsDropDownVisible(!isDropDownVisible)
    }

    const removeSelected = (event) => {
        event.stopPropagation()
        handleSelected(null)
        setSelectedItem(null)
    }

    useEffect(() => {
        if (clearSelected) {
            setIsDropDownVisible(false)
            setSelectedItem(null)
            setResultList(null)
            inputRef.current.value = null
        }
    }, [clearSelected])

    useEffect(() => {
        if (handleSelected) {
            handleSelected(selectedItem)
            setResultList(null)
        } else {
            console.error("Function for handle result is undefined")
        }
    }, [selectedItem])

    return (
        <div className="select-cnt" onClick={() => onButtonClick()}>
            {
                selectedItem != null && !clearSelected ?
                    <SelectedItem item={selectedItem} deleteItem={removeSelected}/>
                    :
                    <input type="text" ref={inputRef} className="select--input" placeholder="Start type to search"
                           onInput={(event) => searchItem(event.target?.value)}/>
            }

            <Button onClickFunc={onButtonClick} type={"drop"}/>

            {isDropDownVisible && <DropDownResult list={resultList ? resultList : list}
                                                  setIsVisibleFunc={setIsDropDownVisible}
                                                  setSelectedItemFunc={setSelected}/>}

        </div>
    )
}

export default SearchSelect