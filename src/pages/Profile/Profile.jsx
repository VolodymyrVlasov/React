import {useAppContext} from "../../hooks/useAppContext";
import {useEffect, useState} from "react";
import Loading from "../../components/Loading/Loading";

import "./Profile.css"
import useFetch from "../../hooks/useFetch";
import {getEnumNames} from "../../utils/utils";
import {Link} from "react-router-dom";
import LoadingError from "../../components/LoadingError/LoadingError";
import {Helmet} from "react-helmet";

const Profile = () => {
    const {data: managerData, error: managerError, loading: managerLoading, fetchData: managerFetch} = useFetch()
    const [{manager}, appDispatch] = useAppContext()
    const user = JSON.parse(localStorage.getItem("user"))
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (!manager && user) {
            managerFetch("getManagerByUid", user.uid)
        }
    }, [])

    useEffect(() => {
        if (managerData && !manager) {
            appDispatch({type: "setManager", payload: managerData})
        }
    }, [managerData])


    useEffect(() => {
        if (user && manager) {
            setIsVisible(true)
        }
        return () => setIsVisible(false)
    }, [user, manager])

    if (managerError) {
        return <LoadingError error={managerError}/>
    }

    if (!manager || !user || !isVisible || managerLoading) {
        return <Loading/>
    }

    return (
        <>
            <Helmet>
                <title>{`${manager?.name} ${manager?.lastName} | PAPERFOX`}</title>
            </Helmet>
            <section className="container col-left">
                <div className="row-left gap-24 full-width">
                    <div className="flex-1">
                        <ProfileCard/>
                    </div>
                    <div className="flex-3 col-left gap-8">
                        <ProfileAnalytics/>
                        <ProfileOrders/>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile

const ProfileOrders = () => {
    return (
        <div className="theme-card col-left gap-24 padding-24 full-width">
            <h2 className="text-h2">Orders</h2>
            <div className="row-left gap-24 full-width">
                <dic className="col-left gap-8 flex-1">
                    <p className="text-primary-p">To do</p>
                    <Link to={"/orders/new"} className="text-h3">9</Link>
                </dic>
                <dic className="col-left gap-8 flex-1">
                    <p className="text-primary-p">In progress</p>
                    <Link to={"/orders/in_progress"} className="text-h3">4</Link>
                </dic>
                <dic className="col-left gap-8 flex-1">
                    <p className="text-primary-p">Done</p>
                    <Link to={"/orders/done"} className="text-h3">2</Link>
                </dic>
                <dic className="col-left gap-8 flex-1">
                    <p className="text-primary-p">Finished</p>
                    <Link to={"/orders/finished"} className="text-h3">293</Link>
                </dic>
            </div>
        </div>
    )
}

const ProfileAnalytics = (manager) => {
    return (
        <div className="theme-card col-left gap-24 padding-24 full-width">
            <h2 className="text-h2">Analytics</h2>
            <div className="row-right full-width">
                <div className="col-left gap-12 flex-1">
                    <p className="text-primary-p">Your orders count</p>
                    <p className="text-h3">2</p>
                </div>
                <div className="col-left gap-12 flex-1">
                    <p className="text-primary-p">Your money flow</p>
                    <p className="text-h3">3452</p>
                </div>
                <div className="col-left gap-12 flex-1">
                    <p className="text-primary-p">Total orders</p>
                    <p className="text-h3">9</p>
                </div>
                <div className="col-left gap-12 flex-1">
                    <p className="text-primary-p">Total money flow</p>
                    <p className="text-h3">19399</p>
                </div>
            </div>
            <div className="col-left gap-12 full-width">
                <p className="text-primary-p">Product group rating (ASC)</p>
                <div className="row-left gap-8">
                    <p className="item-tag">Digital stickers</p>
                    <p className="item-tag">Cups</p>
                    <p className="item-tag">T-shirts</p>
                    <p className="item-tag">Digital stickers</p>
                </div>
            </div>
            <div className="col-left gap-12 full-width">
                <p className="text-primary-p">Product rating (ASC)</p>
                <div className="col-left gap-8 full-width">
                    <div className="item-tag row-left gap-12">
                        <p className="text-primary-p">Паперова наліпка (Raflatac SRA3)</p>
                        <p className="text-primary-p-bold">122 pcs</p>
                    </div>
                    <div className="item-tag row-left gap-12">
                        <p className="text-primary-p">Поліестрова наліпка (Raflatac SRA3)</p>
                        <p className="text-primary-p-bold">12 pcs</p>
                    </div>
                    <div className="item-tag row-left gap-12">
                        <p className="text-primary-p">Горнятко з друком - біле (300 мл.)</p>
                        <p className="text-primary-p-bold">32 pcs</p>
                    </div>
                </div>
            </div>
        </div>
    )

}

const ProfileCard = () => {
    const [{manager}] = useAppContext()
    const user = JSON.parse(localStorage.getItem("user"))

    const getLargeProfilePhoto = () => ((user?.photoURL)?.split('=')[0] + '=s300-c')

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
        <div className={"col-left gap-24"}>
            <div className="profile-photo-wrapper">
                <img className="profile-photo"
                     src={getLargeProfilePhoto()}
                     alt="photo profile"
                     width="250px"
                     height="250px"/>
            </div>
            <p className="text-h3--bold">{manager && manager.name} {manager && manager.lastName}</p>
            <div className={"row-left gap-8"}>
                {manager?.role?.map((role, index) =>
                    <div key={index}
                         className={"item-tag"}>
                        {getEnumNames([role])[0]["name"]}
                    </div>)
                }
            </div>
            <div className="col-left gap-8">
                <a href={`tel:${manager?.phone}`}
                   className={"text-primary-p"}>{manager?.phone && formatPhone(manager?.phone)}</a>
                <a href={`mailto:${manager?.email}`} className={"text-primary-p"}>{manager?.email}</a>
            </div>
        </div>
    )
}
