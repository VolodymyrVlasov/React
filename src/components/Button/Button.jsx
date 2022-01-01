import "./Button.css"

const Button = ({onClickFunc, text}) => {

    const callAction = (e) => {
        console.log("Button -> call dispatch function")
        onClickFunc(e)
    }

    return (<button
        onClick={(e) => callAction(e)}
        className="button">{text}</button>)
}

export default Button