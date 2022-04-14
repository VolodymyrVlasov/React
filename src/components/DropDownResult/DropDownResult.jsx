import {useEffect, useRef, useState} from "react";
import "./DropDownResult.css"
import {CSSTransition} from "react-transition-group";

const DropDownResult = ({
                            list,
                            setIsVisibleFunc,
                            setSelectedItemFunc,
                            isFullWidth = false,
                            position = 'left'
                        }) => {
    const ref = useRef()
    const [isNoMatch, setIsNoMatch] = useState(false)

    const getWidth = () => isFullWidth ? "full-width" : ""

    const onOutSideClick = (e) => {
        if (ref.current && !ref.current?.contains(e.target)) {
            setIsVisibleFunc(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', onOutSideClick)
        return () => document.removeEventListener('click', onOutSideClick)
    }, [])

    useEffect(() => {
        let isShowNoMatch
        if (list == null || list.length === 0) {
            setIsNoMatch(true)
            isShowNoMatch = setTimeout(() => {
                setIsNoMatch(false)
            }, 1200)
        }
        return () => clearTimeout(isShowNoMatch)
    }, [list])

    if (list?.length > 0) {
        return (
            <ul ref={ref}
                className={`drop_down_result-dropdown ${getWidth()} drop_down_result-dropdown--${position}`}>{
                list.map((item, index) => {
                    return (
                        <li key={index} onClick={() => setSelectedItemFunc(item)}
                            className="drop_down_result-dropdown--item">
                            {item.name && item.name} {item.lastName && item.lastName} {item.phone && item.phone} {item.email && item.email}</li>
                    )
                })
            }
            </ul>
        )
    }

    return (
        <CSSTransition in={isNoMatch} timeout={100}
                       classNames="drop_down_result--no-match" unmountOnExit>
            <ul className="drop_down_result-dropdown" ref={ref}>
                <li className="drop_down_result-dropdown--item">No matches</li>
            </ul>
        </CSSTransition>
    )
}

export default DropDownResult