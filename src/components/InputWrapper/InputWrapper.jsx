import "./InputWrapper.css"

const InputWrapper = ({children, label}) => {
    return (
        <div className={"input_wrapper"}>
            <label className={"input_wrapper-label"} htmlFor={label}>{label}</label>
            {children && <div className={"input_wrapper-children"}>{children}</div>}
        </div>
    )
}

export default InputWrapper