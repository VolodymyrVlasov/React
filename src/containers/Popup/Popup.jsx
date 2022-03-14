import "./Popup.css"
import Button from "../../components/Button/Button";

const Popup = ({children, handleClose}) => {
    return (
        <div className="popup-wrapper">
            <div className="theme-card popup-box">
                <div className="popup-close-icon">
                    <Button type='cancel' onClickFunc={handleClose}/>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Popup