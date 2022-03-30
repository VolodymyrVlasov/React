import "./Popup.css"
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import {CSSTransition} from "react-transition-group";

const Popup = ({children, handleClose}) => {
    const [isVisible, setIsVisible] = useState(false)

    const close = () => {
        setIsVisible(false)
        setTimeout(() => handleClose(), 100)
    }

    useEffect(() => {
        setIsVisible(true)
    }, [])


    return (
        <div className="popup-wrapper">
            <CSSTransition in={isVisible} timeout={700}
                           classNames="fade-animation" unmountOnExit>
                <div className="theme-card popup-box">
                    <div className="popup-close-icon">
                        <Button type='cancel' onClickFunc={close}/>
                    </div>
                    {children}
                </div>
            </CSSTransition>
        </div>
    )
}

export default Popup