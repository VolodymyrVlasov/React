import Button from "../Button/Button";
import {useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch";
import {useOrder} from "../../hooks/useOrder";
import Loading from "../Loading/Loading";
import CartItemForm from "../CartItemForm/CartItemForm";

const AddProduct = () => {
    const [, dispatch] = useOrder()
    const [cartItems, setCartItems] = useState([])
    const {data: productsData, loading: productsLoading, error: productsError, fetchData: productsFetch} = useFetch()

    useEffect(() => {
        dispatch({type: "addCartItems", payload: cartItems})
        if (cartItems.length === 0) {
            productsFetch('getProducts')
        }
    }, [cartItems])

    const onRemoveBtnClick = (index) => {
        const filteredTasks = [...cartItems]
        filteredTasks.splice(index, 1)
        filteredTasks.length === 0 ? setCartItems([]) : setCartItems(filteredTasks)
    }

    const addCartItem = (product) => setCartItems(prevState => [...prevState, product])

    if (productsLoading) {
        return (<Loading/>)
    }

    return (
        <>
            <CartItemForm productList={productsData} addToOrderCallback={addCartItem}/>
            {cartItems.map((cartItem, index) =>
                <Task key={index} cartItem={cartItem} removeTaskFunk={() => onRemoveBtnClick(index)}/>)}
        </>
    )
}

export default AddProduct

const Task = ({cartItem, removeTaskFunk}) => {
    if (cartItem?.product !== undefined) {
        return (<div className="row-h-center_v-spb">
            {cartItem.product.name}
            <div>{cartItem?.amount}</div>
            <div>{cartItem?.totalPrice}</div>
            <Button onClickFunc={() => removeTaskFunk(cartItem.product.productId)} buttonText={"remove"}/>
        </div>)
    }
    return (<div className="row-h-center_v-spb">NO ID</div>)
}