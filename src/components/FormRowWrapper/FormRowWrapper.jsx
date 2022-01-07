import "./InputWrapper.css"
import Button from "../Button/Button";

const FormRowWrapper = ({children, callback, buttonText = "+", buttonType = "add"}) => {
    return (
        <div className="input_wrapper">
            {children}
            {callback && <Button onClickFunc={callback} buttonText={buttonText} type={buttonType}/>}
        </div>
    )
}

export default FormRowWrapper