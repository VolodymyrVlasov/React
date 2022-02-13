import "./Button.css"
import {useEffect, useState} from "react";

const Button = ({onClickFunc, buttonText, type = "default"}) => {
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
                className={`button-${style}`}>{text}</button>
    )
}

export default Button