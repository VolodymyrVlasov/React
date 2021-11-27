import "./RedirectTask.css"
import defaultAvatar from "../../img/ico-default-avatar.webp"
import {useState} from "react";

const RedirectTask = ({users, avatarUrl, isCardFull, maker, setMaker}) => {
    const [isVisibleDropDown, setIsVisibleDropDown] = useState(false)

    const setNewMaker = (id) => {
        const newMaker = users.find(e => e.id === id)
        setMaker(newMaker)
        setIsVisibleDropDown(!isVisibleDropDown)
    }

    const getUserList = () => {
        if (users) {
            return users.map((user, index) => {
                return (
                    <li key={index}>
                        <button onClick={(e) => setNewMaker(user.id)}
                                className="redirect_task-drop_down-btn">{user.name}</button>
                    </li>
                )
            })
        }
    }

    const isMakerVisible = () => {
        if (isCardFull) {
            return (
                <>
                    <button className="redirect_task-btn"
                            onClick={() => setIsVisibleDropDown(!isVisibleDropDown)}>{maker.name}</button>
                    <ul className={isVisibleDropDown ? "redirect_task-drop_down" : "hide"}>{getUserList()}</ul>
                </>
            )
        }
    }

    return (
        <div className="redirect_task">
            {isMakerVisible()}
            <img className="sm-avatar redirect_task-avatar" src={avatarUrl ? avatarUrl : defaultAvatar} alt="avatar"/>
        </div>
    )
}

export default RedirectTask