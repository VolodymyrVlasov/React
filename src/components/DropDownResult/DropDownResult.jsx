import {useEffect, useRef} from "react";
import "./DropDownResult.css"

const DropDownResult = ({list, setIsVisibleFunc, setSelectedItemFunc, ifNotFound = "No matches"}) => {
    const ref = useRef()

    const onOutSideClick = (e) => {
        if (ref.current && !ref.current?.contains(e.target)) {
            setIsVisibleFunc(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', onOutSideClick)
        return () => document.removeEventListener('click', onOutSideClick)
    })

    if (list?.length > 0) {
        return (
            <ul ref={ref} className="drop_down_result-dropdown">{
                list.map((item, index) => {
                    return (
                        <li key={index} onClick={() => setSelectedItemFunc(item)}
                            className="drop_down_result-dropdown--item">
                            {item.name && item.name} {item.lastname && item.lastname} {item.phone && item.phone}
                            {item.email && item.email}</li>
                    )
                })
            }
            </ul>
        )
    }

    return (
        <ul className="drop_down_result-dropdown">
            <li className="drop_down_result-dropdown--item">{ifNotFound}</li>
        </ul>
    )
}

export default DropDownResult