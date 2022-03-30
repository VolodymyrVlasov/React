import useFetch from "../../hooks/useFetch";
import {useEffect, useState} from "react";
import Loading from "../../components/Loading/Loading";
import UserCard from "../../components/UserCard/UserCard";
import CustomerAddForm from "../../components/CustomerAddForm/CustomerAddForm";
import {useAppContext} from "../../hooks/useAppContext";
import {search} from "../../utils/search";
import LoadingError from "../../components/LoadingError/LoadingError";
import {CSSTransition} from "react-transition-group";

const Customers = () => {
    const {
        data: rawDataCustomers,
        error: errorCustomers,
        loading: loadingCustomers,
        fetchData: fetchCustomers
    } = useFetch()
    const createCustomer = (customer) => fetchCustomers('createCustomer', customer)
    const [{searchQuery}, dispatch] = useAppContext()
    const [customersToRender, setCustomersToRender] = useState(null)

    useEffect(async () => {
        if (!rawDataCustomers) {
            await fetchCustomers('getCustomers')
        }
        if (searchQuery && rawDataCustomers.length > 0) {
            setCustomersToRender(search({array: rawDataCustomers, key: searchQuery}).resultArray)
        }
        if (rawDataCustomers && !searchQuery) {
            setCustomersToRender(rawDataCustomers)
        }
    }, [searchQuery, rawDataCustomers])

    if (loadingCustomers) {
        return (
            <CSSTransition in={!customersToRender} timeout={700}
                           classNames="fade-animation" unmountOnExit>
                <div className={"section full-width full-height row-vertical-center"}>
                    <Loading/>
                </div>
            </CSSTransition>
        )
    }

    if (errorCustomers) {
        return <LoadingError error={errorCustomers}/>
    }

    return (
        <CSSTransition in={customersToRender} timeout={700}
                       classNames="fade-animation" unmountOnExit>
            <section className="container">
                <div className="col-left gap-24">
                    <div className="col-left gap-16 full-width">
                        <p className={"text-h3--bold"}>Fast create</p>
                        <div className="theme-card row-left gap-16 full-width">
                            <CustomerAddForm addCustomer={createCustomer}/>
                        </div>
                    </div>
                    <div className="col-left gap-16 full-width">
                        <p className={"text-h3--bold"}>Customers</p>
                        <div className={"col-left gap-8 full-width"}>
                            {customersToRender && customersToRender.map(user => <UserCard key={user.customerId}
                                                                                          user={user}/>)}
                        </div>
                    </div>
                </div>
            </section>
        </CSSTransition>
    )
}

export default Customers

