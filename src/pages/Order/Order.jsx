import "./Order.css"
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Loading from "../../components/Loading/Loading";
import useFetch from "../../hooks/useFetch";
import AddProduct from "../../components/AddProduct/AddProduct";
import Button from "../../components/Button/Button";
import {CSSTransition} from "react-transition-group";
import {useOrder} from "../../hooks/useOrder";
import {Helmet} from "react-helmet";
import OrderPaymentEditor from "../../components/OrderEditor/OrderPaymentEditor/OrderPaymentEditor";
import OrderProfile from "../../components/OrderEditor/OrderProfile/OrderProfile";
import OrderAttributesEditor from "../../components/OrderEditor/OrderAttributesEditor/OrderAttributesEditor";

const Order = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [state, dispatch] = useOrder()
    const {data, loading, fetchData} = useFetch()
    const [isVisible, setIsVisible] = useState(false)
    const [saveOrder, setSaveOrder] = useState(false)

    useEffect(async () => {
        await fetchData("getOrderById", params.id)
    }, [])

    useEffect(() => {
        if (data) {
            dispatch({type: "fillOrder", payload: data})
            setIsVisible(true)
        }
        return () => setIsVisible(false)
    }, [data])

    useEffect(async () => {
        if (saveOrder) {
            await fetchData("updateOrder", state)
            setSaveOrder(false)
        }
    }, [saveOrder])

    if (loading) {
        return (
            <CSSTransition in={!isVisible} timeout={700}
                           classNames="fade-animation" unmountOnExit>
                <Loading/>
            </CSSTransition>
        )
    }

    return (
        <>
            <Helmet>
                <title>{`Order ${state.orderId} | PAPERFOX`}</title>
            </Helmet>
            <CSSTransition in={isVisible} timeout={700}
                           classNames="fade-animation" unmountOnExit>
                <section className={"container col-left gap-24"}>
                    <div className="row-left full-width">
                        <div className="row-left flex-1">
                            <Button onClickFunc={() => navigate(-1)} buttonText={"Back"}/>
                        </div>
                        <div className="row-right flex-1">
                            <Button onClickFunc={() => setSaveOrder(true)} buttonText={"Save"}/>
                        </div>
                    </div>
                    <div className="row-left gap-24 full-width">
                        <div className="col-left flex-1">
                            <OrderProfile/>
                        </div>

                        <div className="col-left flex-4 gap-8">
                            <div className="theme-card col-left full-width gap-12">
                                <OrderAttributesEditor/>
                            </div>
                            <div className="theme-card col-left full-width gap-12">
                                <p className={"text-primary-label"}>Add cart item</p>
                                <AddProduct/>
                            </div>
                            <div className="theme-card col-left full-width gap-12">
                                <OrderPaymentEditor/>
                            </div>
                        </div>
                    </div>
                </section>
            </CSSTransition>
        </>
    )
}

export default Order
