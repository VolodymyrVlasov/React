import defaultAvatar from "../../img/ico-default-avatar.webp"
import "./ProfileButton.css"
import {useAuth} from "../../hooks/useAuth";

const ProfileButton = () => {
    const {profile} = useAuth()

    const openProfile = () => {
        alert("")
    }

    return (
        <div className="profile-cnt">
            <button
                style={{backgroundImage: `url("${profile?.avatar || defaultAvatar}"`}}
                className="profile-button"/>
            <i className="profile-point"/>
        </div>
    )
}

export default ProfileButton