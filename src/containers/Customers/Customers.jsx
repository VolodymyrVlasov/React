import useFetch from "../../hooks/useFetch";
import {useEffect, useState} from "react";
import Loading from "../../components/Loading/Loading";
import UserCard from "../../components/UserCard/UserCard";
import CustomerAddForm from "../../components/CustomerAddForm/CustomerAddForm";
import {useAppContext} from "../../hooks/useAppContext";
import {search} from "../../utils/search";
import LoadingError from "../../components/LoadingError/LoadingError";

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

    useEffect(() => {
        if (!rawDataCustomers) {
            fetchCustomers('getCustomers')
        }
        if (searchQuery && rawDataCustomers.length > 0) {
            setCustomersToRender(search({array: rawDataCustomers, key: searchQuery}).resultArray)
        }
        if (rawDataCustomers && !searchQuery) {
            setCustomersToRender(rawDataCustomers)
        }
    }, [searchQuery, rawDataCustomers])

    if (loadingCustomers) {
        return <Loading/>
    }

    if (errorCustomers) {
        return <LoadingError error={errorCustomers}/>
    }

    return (
        <section className="container">
            <div className="col-left gap-24">
                <div className="col-left gap-8 full-width">
                    <p>Fast create</p>
                    <div className="row-left gap-16 full-width">
                        <CustomerAddForm addCustomer={createCustomer}/>
                    </div>
                </div>
                <div className="col-left gap-8 full-width">
                    <p>Customers</p>
                    {customersToRender && customersToRender.map(user => <UserCard key={user.customerId} user={user}/>)}
                </div>
            </div>
        </section>
    )
}

export default Customers

