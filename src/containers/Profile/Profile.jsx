import {useAppContext} from "../../hooks/useAppContext";
import {useAuth} from "../../hooks/useAuth";
import {useEffect} from "react";
import Loading from "../../components/Loading/Loading";

import "./Profile.css"

const Profile = () => {
    const [{manager}] = useAppContext()
    const user = useAuth()

    useEffect(() => {
        console.log('manager', manager, 'user', user)
    }, [user])

    const getLargeProfilePhoto = () => {
        if (!user?.photoURL) {
            return
        }
        return (user?.photoURL).split('=')[0] + '=s600-c'
    }

    if (user === undefined) {
        return <Loading/>
    }

    if (!manager) {
        return <Loading/>
    }

    return (
        <div className='container col-left'>
            <div className='col-left flex-1'>
                <div className='profile-photo-wrapper'>
                    <img className='profile-photo' src={getLargeProfilePhoto()} alt="photo profile" width='300'
                         height='300'/>
                </div>
                <p className='text-label'>{manager.name} {manager.lastName}</p>
            </div>
            <div className='col-left flex-3'>{getLargeProfilePhoto()}
            </div>
        </div>
    )
}

export default Profile