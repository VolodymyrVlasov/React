import Button from "../Button/Button";
import {useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch";
import {useOrder} from "../../hooks/useOrder";
import Loading from "../Loading/Loading";
import CartItemForm from "../CartItemForm/CartItemForm";
import "./AddProduct.css"

const AddProduct = () => {
    const [, dispatch] = useOrder()
    const [cartItems, setCartItems] = useState([])
    const {data: productsData, loading: productsLoading, error: productsError, fetchData: productsFetch} = useFetch()

    useEffect(async () => {
        dispatch({type: "addCartItems", payload: cartItems})
        if (cartItems.length === 0) {
            await productsFetch('getProducts')
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
            {cartItems.length > 0 &&
            <div className='task-list-cnt'>
                <div className='task-list-cnt--top'/>
                <ul className='task-list-cnt--content col-left gap-8'>
                    {cartItems.map((cartItem, index) =>
                        <Task key={index} cartItem={cartItem} removeTaskFunk={() => onRemoveBtnClick(index)}/>)}
                </ul>
                <div className='task-list-cnt--bottom'/>
            </div>
            }
        </>
    )
}

export default AddProduct

export const Task = ({cartItem, removeTaskFunk}) => {
    if (cartItem?.product !== undefined) {
        return (
            <li className="row-h-center_v-spb task-row">
                <div className='task-label'>• {cartItem.product.name}</div>
                <div className='row-left'>
                    <div className='row-h-center_v-spb gap-24'>
                        <div className='task-label'>{cartItem?.amount} pcs</div>
                        <div className='task-label'>{cartItem?.totalPrice} uah</div>
                        <Button onClickFunc={() => removeTaskFunk(cartItem.product.productId)} type='minus'/>
                    </div>
                </div>
            </li>)
    }
    return (<div className='row-h-center_v-spb'>NO ID</div>)
}