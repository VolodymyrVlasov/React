import "./Button.css"
import {useEffect, useState} from "react";

const Button = ({
                    children, onClickFunc, buttonText, isLoading = false,
                    type = "default", disabled = false, buttonType = "button"
                }) => {
    const [style, setStyle] = useState(null)
    const [text, setText] = useState(null)

    useEffect(() => {
        switch (type) {
            case "add":
                setStyle("add")
                buttonText && buttonText !== "" ? setText(buttonText) : setText("+")
                break
            case "plus":
                setStyle("plus-minus")
                buttonText && buttonText !== "" ? setText(buttonText) : setText("+")
                break
            case "minus":
                setStyle("plus-minus")
                buttonText && buttonText !== "" ? setText(buttonText) : setText("-")
                break
            case "cancel":
                setStyle("cancel")
                buttonText && buttonText !== "" ? setText(buttonText) : setText("+")
                break
            case "drop":
                setStyle("drop")
                buttonText && buttonText !== "" ? setText(buttonText) : setText("›")
                break
            default:
                setStyle("default")
                buttonText && buttonText !== "" ? setText(buttonText) : setText("click me")
        }
    }, [])

    return (
        <button onClick={(e) => onClickFunc(e)}
                type={buttonType}
                className={`button-${style}`} disabled={disabled}>
            {isLoading === false && <p>{text ? text : children}</p>}
            {isLoading &&
            <div className="row-center gap-8">
                <i className="button-loading-animation"/>
                <span>Loading</span>
            </div>
            }
        </button>
    )
}

export default Button