import "./RedirectTask.css"
import {useEffect, useState} from "react";
import {useTasks} from "../../hooks/useTasks";
import useFetch from "../../hooks/useFetch";
import defaultAvatar from "../../img/ico-default-avatar.webp"

const RedirectTask = ({task}) => {
    console.log("RedirectTask", task)
    const [{items}, dispatch] = useTasks()
    const {data, error, loading, fetchData} = useFetch()
    const [users, setUsers] = useState(null)
    const [isVisibleDropDown, setIsVisibleDropDown] = useState(false)

    useEffect(() => {
        fetch("/FakeDB/users.json")
            .then(data => data.json())
            .then(usersData => {
                setUsers(usersData.users)
                console.log(usersData.users)
            })
    }, [])

    // const setNewMaker = (id) => {
    //     const newMaker = items.find(e => e.id === id)
    //     const taskToUpdate = {
    //         ...task,
    //         maker: newMaker
    //     }
    //     fetchData("updateTask", taskToUpdate)
    //     setIsVisibleDropDown(!isVisibleDropDown)
    // }

    // useEffect(() => {
    //     dispatch("updateTask", data)
    // }, [data])
    // const getUserList = () => {
    //     return items?.map((user, index) => {
    //         return (
    //             <li key={index}>
    //                 <button onClick={(e) => setNewMaker(user.id)}
    //                         className="redirect_task-drop_down-btn">{loading && <Loading/> || user.name}</button>
    //             </li>
    //         )
    //     })
    // }


    return (
        <div className="redirect_task">
            <button className="redirect_task-btn"
                    onClick={() => setIsVisibleDropDown(!isVisibleDropDown)}>{}</button>
            <ul className={isVisibleDropDown ? "redirect_task-drop_down" : "hide"}>{
                users?.map((user, i) => {
                    return (
                        <li key={i}>
                            <button onClick={(e) => console.log(user.id)}
                                    className="redirect_task-drop_down-btn">{user.name}</button>
                        </li>)
                })}
            </ul>
            <img className="sm-avatar redirect_task-avatar" src={defaultAvatar} alt="avatar"/>
        </div>
    )
}

export default RedirectTask