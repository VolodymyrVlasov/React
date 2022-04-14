import Button from "../Button/Button";
import {useEffect} from "react";
import useFetch from "../../hooks/useFetch";
import {useOrder} from "../../hooks/useOrder";
import Loading from "../Loading/Loading";
import CartItemForm from "../CartItemForm/CartItemForm";
import "./AddProduct.css"

const AddProduct = () => {
    const [{cartItems}, dispatch] = useOrder()
    const {data: productsData, loading: productsLoading, error: productsError, fetchData: productsFetch} = useFetch()

    useEffect(async () => {
        await productsFetch('getProducts')
    }, [])

    const onRemoveBtnClick = (index) => dispatch({type: "removeCartItemById", payload: index})

    const addCartItem = (item) => dispatch({type: "addCartItem", payload: item})

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