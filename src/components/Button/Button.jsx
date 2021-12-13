import "./Button.css"

const Button = ({dispatch, text}) => {

    const callAction = (e) => {
        console.log("Button -> call dispatch function")
    }

    return (<button
        onClick={(e) => callAction(e)}
        className="button-new-task">{text}</button>)
}

export default Button