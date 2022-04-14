import {useOrder} from "../../../hooks/useOrder";
import {formatDate} from "../../../utils/utils";
import Button from "../../Button/Button";
import {useEffect, useState} from "react";

const DateEditor = ({initialDate}) => {
    const [finishedDate, setFinishedDate] = useState(initialDate)
    const [time, setTime] = useState("18:30")
    const [date, setDate] = useState(initialDate.split("T")[0])
    const [isEditDate, setIsEditDate] = useState(false)
    const [, dispatch] = useOrder()

    useEffect(() => {
        dispatch({type: "addFinishedDate", payload: finishedDate})
    }, [finishedDate])

    const handleFrom = (e) => {
        e?.preventDefault()
        setFinishedDate(`${date}T${time}`)
        setIsEditDate(!isEditDate)
    }

    return (
        <form
            onSubmit={(e) => handleFrom(e)}
            className={"col-left gap-8 full-width"}>
            <div className="row-left full-width gap-12">
                <p className={"text-h4--bold"}>{formatDate(finishedDate)}</p>
                <Button type={"edit"} onClickFunc={() => setIsEditDate(!isEditDate)}/>
            </div>
            {isEditDate &&
            <div className="theme-card col-center full-width gap-12">
                <input type="date"
                       value={date}
                       min={initialDate.split("T")[0]}
                       className={"full-width"}
                       onChange={(e) => setDate(e.target.value)}/>
                <input type="time"
                       className={"full-width"}
                       value={time}
                       step={1800}
                       min={"10:30"}
                       max={"19:00"}
                       onChange={(e) => setTime(e.target.value)}/>
                <Button buttonText={"ok"} buttonType={"submit"} onClickFunc={(e) => handleFrom(e)}/>
            </div>
            }
        </form>
    )
}

export default DateEditor
