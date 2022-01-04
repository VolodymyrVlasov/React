import {createRef, useEffect, useState} from "react";
import DropDownResult from "../DropDownResult/DropDownResult";
import "./Select.css"
import SelectedItem from "../SelectedItem/SelectedItem";

const Select = ({list, handleSelected}) => {
    const [isDropDownVisible, setIsDropDownVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState(list[0])
    const [resultList, setResultList] = useState(null)
    const inputRef = createRef()

    const searchItem = (target) => {
        setIsDropDownVisible(true)
        if (target) {
            let result = list.filter(item => {
                return item.name?.toLowerCase().includes(target.toLowerCase()) ||
                    item.lastname?.toLowerCase().includes(target.toLowerCase()) ||
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
            setSelectedItem(undefined)
        }
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
        <div className="select-cnt" onClick={() => onButtonClick()}>
            {
                selectedItem ?
                    <SelectedItem item={selectedItem}/>
                    :
                    <input type="text"
                           ref={inputRef}
                           className="select--input"
                           placeholder="Enter name or lastname"
                           value={selectedItem?.name}
                           onInput={(event) => searchItem(event.target?.value)}/>
            }

            <button className="select--btn"
                    onClick={() => onButtonClick()}>{isDropDownVisible ? "-" : "+"}</button>
            {isDropDownVisible ?
                <DropDownResult
                    resultList={resultList ? resultList : list}
                    setIsVisibleFunc={setIsDropDownVisible}
                    setSelectedItemFunc={setSelected}/>
                : null}
        </div>
    )
}

export default Select