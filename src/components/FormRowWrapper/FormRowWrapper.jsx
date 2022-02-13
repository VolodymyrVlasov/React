import "./FormRowWrapper.css"
import Button from "../Button/Button";

const FormRowWrapper = ({children, callback, buttonText = "+", buttonType = "add"}) => {
    return (
        <div className="form_row-wrapper">
            {children}
            {callback && <Button onClickFunc={callback} buttonText={buttonText} type={buttonType}/>}
        </div>
    )
}

export default FormRowWrapper