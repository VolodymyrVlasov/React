import "./Popup.css"

const Popup = ({children, handleClose}) => {
    return (
        <div className="popup-wrapper">
            <div className="popup-box">
                <button className="popup-close-icon" onClick={() => handleClose()}>+</button>
                {children}
            </div>
        </div>
    )
}

export default Popup