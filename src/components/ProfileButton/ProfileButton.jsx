import defaultAvatar from "../../img/ico-default-avatar.webp"
import {useState} from "react";
import DropDownResult from "../DropDownResult/DropDownResult";
import {InnerEndpoints} from "../../constants/InnerEndpoints";
import {useAppContext} from "../../hooks/useAppContext";
import {logOut} from "../../utils/firebase";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

import "./ProfileButton.css"

const ProfileButton = () => {
    const [isDropDownVisible, setIsDropDownVisible] = useState(false)
    const [{manager}, appDispatch] = useAppContext()
    const navigate = useNavigate()
    const user = useAuth()

    const openMenu = async (endpoint) => {
        setIsDropDownVisible(false)
        if (endpoint.name === 'Logout') {
            await logOut()
            appDispatch({type: 'setManager', payload: null})
            navigate('login')
            return
        }
        navigate(endpoint.link)
    }

    return (
        <>
            <div className="profile-cnt">
                <button
                    onMouseOver={() => setIsDropDownVisible(true)}
                    onClick={() => setIsDropDownVisible(true)}
                    style={{backgroundImage: `url("${user?.photoURL || defaultAvatar}"`}}
                    className="profile-button"/>
                <i className="profile-point"/>
            </div>
            {isDropDownVisible && <DropDownResult
                setIsVisibleFunc={setIsDropDownVisible}
                list={InnerEndpoints}
                position={'right'}
                setSelectedItemFunc={openMenu}
            />}
        </>
    )
}

export default ProfileButton