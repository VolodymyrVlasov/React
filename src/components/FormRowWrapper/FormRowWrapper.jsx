import "./FormRowWrapper.css"
import Button from "../Button/Button";

const FormRowWrapper = ({children, callback, buttonText = "+", buttonType = "add"}) => {
    return (
        <div className="row-vertical-center gap-24 full-width">
            {children}
            {callback && <Button onClickFunc={callback} buttonText={buttonText} type={buttonType}/>}
        </div>
    )
}

export default FormRowWrapper