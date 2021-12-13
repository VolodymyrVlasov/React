import "./RedirectTask.css"
import {useEffect, useState} from "react";
import {useTasks} from "../../hooks/useTasks";
import useFetch from "../../hooks/useFetch";
import defaultAvatar from "../../img/ico-default-avatar.webp"

const RedirectTask = ({task}) => {
    const [{items}, dispatch] = useTasks()
    const {data, error, loading, fetchData} = useFetch()
    const [makers, setMakers] = useState(null)
    const [isVisibleDropDown, setIsVisibleDropDown] = useState(false)

    //fixme: how to use useFetch for different calls in one component
    useEffect(() => {
        fetch("/FakeDB/users.json")
            .then(data => data.json())
            .then(usersData => setMakers(usersData?.users))
            .catch(err => new Error(err))
    }, [])

    const redirectToMaker = (maker) => {
        console.log(maker)
        //todo: update maker in this Order after server response using Context
    }

    return (
        <div className="redirect_task">
            <button className="redirect_task-btn"
                    onClick={() => setIsVisibleDropDown(!isVisibleDropDown)}>{task?.maker?.name}</button>
            <ul className={isVisibleDropDown ? "redirect_task-drop_down" : "hide"}>{
                makers?.map((maker, i) => {
                    return (
                        <li key={i}>
                            <button onClick={() => redirectToMaker(maker)}
                                    className="redirect_task-drop_down-btn">{maker.name}</button>
                        </li>)
                })}
            </ul>
            <img className="sm-avatar redirect_task-avatar" src={defaultAvatar} alt="avatar"/>
        </div>
    )
}

export default RedirectTask