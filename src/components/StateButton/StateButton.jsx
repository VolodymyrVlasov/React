import {useState} from "react";
import "./StateButton.css"

const StateButton = ({task}) => {
    // const [, dispatch] = useTasks()
    const [btnStyle, setBtnStyle] = useState("state_btn todo")

    const setTodoState = (e) => {
        e.stopPropagation()
        switch (task.status) {
            case "Приступить":
                // setTaskState("Завершить")
                setBtnStyle("state_btn in_progress")
                break
            case "Завершить":
                // setTaskState("Готов")
                setBtnStyle("state_btn done")
                break
            case "Готов":
                if (window.confirm("Заказ выдан?")) {
                    // setTaskState("Выдан")
                    setBtnStyle("state_btn finished")
                }
                break
        }
    }

    return (<button onClick={(e) => setTodoState(e)} className={btnStyle}>{task.status}</button>)

}
export default StateButton