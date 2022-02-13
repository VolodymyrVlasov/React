import {useEffect, useState} from "react";
import {getPriceIndexByAmount} from "../../utils/utils";
import FormRowWrapper from "../FormRowWrapper/FormRowWrapper";
import SearchSelect from "../SearchSelect/SearchSelect";
import InputNumber from "../InputNumber/InputNumber";
import "./CartItemForm.css"
import InputWrapper from "../InputWrapper/InputWrapper";

const CartItemForm = ({productList, addToOrderCallback}) => {
    const [product, setProduct] = useState(null)
    const [amount, setAmount] = useState(1)
    const [totalPrice, setTotalPrice] = useState(null)
    const [cartItem, setCartItem] = useState(null)
    const [clear, setClear] = useState(false)

    const onAmountChange = (value) => product && setAmount(Number(value))

    const addTask = () => {
        cartItem && addToOrderCallback(cartItem)
        setCartItem(null)
        setProduct(null)
        setAmount(1)
        setClear(true)
    }

    useEffect(() => {
        if (amount && product) {
            let index = getPriceIndexByAmount(amount)
            setTotalPrice(product.priceList[index] * amount)
        }
        if (product && amount && totalPrice) {
            setCartItem({product, amount, totalPrice})
            setClear(false)
        }
        if (product == null) {
            setAmount(1)
        }
    }, [product, amount, totalPrice, product])

    return (
        <FormRowWrapper callback={addTask} buttonType={"add"}>
            <SearchSelect list={productList} handleSelected={(selectedProduct) => setProduct(selectedProduct)}
                          clearSelected={clear}/>
            {product &&
                <>
                    <InputNumber min={1} onChangeCallback={onAmountChange} valueSate={amount} label="Amount"/>
                    <InputWrapper label={"Price"}>
                        <div>{product.priceList[getPriceIndexByAmount(amount)]}</div>
                    </InputWrapper>
                    <InputWrapper label={"Sum"}>
                        <div className={"cart_item_form-sum"}>{totalPrice}</div>
                    </InputWrapper>
                </>
            }
        </FormRowWrapper>
    )
}

export default CartItemForm
