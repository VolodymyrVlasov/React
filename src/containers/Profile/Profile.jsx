import {useAppContext} from "../../hooks/useAppContext";
import {useAuth} from "../../hooks/useAuth";
import {useEffect} from "react";
import Loading from "../../components/Loading/Loading";

import "./Profile.css"
import useFetch from "../../hooks/useFetch";
import {getEnumNames} from "../../utils/utils";

const Profile = () => {
    const {data: managerData, error: managerError, loading: managerLoading, fetchData: managerFetch} = useFetch()
    const [{manager}, appDispatch] = useAppContext()
    const user = useAuth()

    useEffect(async () => {
        if (!manager && user) {
            await managerFetch("getManagerByUid", user.uid)
        }

        if (managerData) {
            appDispatch({type: "setManager", payload: managerData})
        }
    }, [user, manager, managerData])


    if (!manager || user === undefined) {
        return <Loading/>
    }

    return (
        <section className='section container col-left'>
            <div className='row-left gap-24 full-width'>
                <div className="flex-1">
                    <ProfileCard user={user} manager={manager}/>
                </div>

            </div>
        </section>
    )
}

export default Profile

const ProfileAnalytics = (manager) => {
    /*
    * time scope
    *
    * total orders count
    * total design item count
    * total design money flow
    * total money flow
    * most rated product group by money flow
    * most rated product group by amount
    *
    * */
    return (
        <>
        </>
    )

}

const ProfileCard = ({user, manager}) => {

    const getLargeProfilePhoto = () => (user?.photoURL)?.split('=')[0] + '=s300-c'

    const formatPhone = (phone) => {
        const formatted = []
        formatted.push(phone.substr(0, 3))
        formatted.push(phone.substr(3, 3))
        formatted.push(phone.substr(6, 3))
        formatted.push(phone.substr(9))
        console.log(formatted)
        return formatted.join(" ")
    }

    return (
        <div className={"theme-card col-left gap-24 padding-24"}>
            <div className='profile-photo-wrapper'>
                <img className="profile-photo" src={getLargeProfilePhoto()} alt="photo profile" width="296px"
                     height="296px"/>
            </div>
            <p className='text-h3--bold'>{manager?.name} {manager?.lastName}</p>
            <div className={"row-left gap-8"}>
                {manager?.role?.map((role, index) => <div key={index}
                                                          className={"item-tag"}>{getEnumNames([role])[0]["name"]}</div>)}
            </div>
            <div className="col-left gap-8">
                <a href={`tel:${manager?.phone}`} className={"text-primary-p"}>{formatPhone(manager?.phone)}</a>
                <a href={`mailto:${manager?.email}`} className={"text-primary-p"}>{manager?.email}</a>
            </div>
        </div>
    )
}
