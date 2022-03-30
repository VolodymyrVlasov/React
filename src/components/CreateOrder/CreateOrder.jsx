import {useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch";
import "./CreateOrder.css"
import SearchSelect from "../SearchSelect/SearchSelect";
import AddProduct from "../AddProduct/AddProduct";
import {useOrder} from "../../hooks/useOrder";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";
import CommentForm from "../CommentForm/CommentForm";
import {useAppContext} from "../../hooks/useAppContext";
import OrderSummary from "../OrderSummary/OrderSummary";
import SelectCustomer from "../SelectCustomer/SelectCustomer";

const CreateOrder = () => {
    const {data: makers, loading: makersLoading, error: makersError, fetchData: makersFetch} = useFetch()
    const {data: managers, loading: managersLoading, error: managersError, fetchData: managersFetch} = useFetch()
    const {data: order, loading: orderLoading, error: orderError, fetchData: orderFetch} = useFetch()

    const [state, dispatch] = useOrder()
    const [{manager}, appDispatch] = useAppContext()
    const [isMount, setIsMount] = useState(true)
    // const user = JSON.parse(localStorage.getItem("user"))

    useEffect(async () => {
        if (isMount) {
            await makersFetch('searchCustomersByRole', 'MAKER')
            await managersFetch('searchCustomersByRole', 'MANAGER')
            dispatch({type: "addAuthor", payload: manager})
        }
        return () => {
            setIsMount(false)
        }
    }, [])

    const addMaker = (maker) => dispatch({type: "addMaker", payload: maker})

    const addManager = (manager) => dispatch({type: "addManager", payload: manager})

    const addComment = (commentMessage) => {
        const comment = {
            author: state.manager,
            message: commentMessage
        }
        dispatch({type: "addComment", payload: comment})
    }

    const createOrder = async () => {
        if (state.customer && state.maker && state.cartItems) {
            await orderFetch("createOrder", state)
        }
    }

    if (orderLoading) {
        return <Loading/>
    }

    if (order) {
        return <div className="col-left gap-12">
            <p className="DELETE">Order #{order.orderId} saved</p>
            <Button buttonText={"Okay"} onClickFunc={() => appDispatch({type: "changeNewTaskPopup"})}/>
        </div>
    }

    return (
        <div className="create-order-card col-left gap-24 ">
            <h2 className="text-h3--bold">New order form</h2>
            <div className="row-left full-width gap-24">
                <div id="maker" className="col-left gap-12 flex-1">
                    <p className={"text-primary-label"}>Manager</p>
                    <SearchSelect list={managers} handleSelected={addManager} defaultValue={manager}/>
                </div>
                <div id="maker" className="col-left gap-12 flex-1">
                    <p className={"text-primary-label"}>Maker</p>
                    <SearchSelect list={makers} handleSelected={addMaker}/>
                </div>
            </div>
            <div id="customer" className="col-left gap-12 full-width">
                <p className={"text-primary-label"}>Customer</p>
                <SelectCustomer/>
            </div>
            <div className="row-left gap-24 full-width">
                <div className="col-left gap-12 flex-4">
                    <p className={"text-primary-label"}>Tasks</p>
                    <AddProduct/>
                </div>
                <div className="col-left gap-12 flex-1">
                    <p className={"text-primary-label"}>Comment</p>
                    <CommentForm addCommentCallback={addComment}/>
                </div>
            </div>
            <div className="col-left gap-12 full-width">
                <p className="text-h4--bold">Summary</p>
                <OrderSummary/>
            </div>
            <div className="row-right full-width">
                <Button onClickFunc={() => createOrder()} buttonText={"Create"}/>
            </div>
        </div>
    )
}

export default CreateOrder