import {getEnumNames} from "../../utils/utils";
import "./ProductCard.css"

const ProductCard = ({product}) => {
    return (
        <div className='theme-card row-h-center_v-spb gap-24'>
            <div className='flex-1'>
                <span className='item-tag'>{getEnumNames([product.productType])[0]['name']}</span>
            </div>
            <span className='flex-3'>{product.name}</span>
            <div className='flex-3 row-h-center_v-spb gap-24'>{product.priceList.map((price, index) =>
                <span key={index} className='flex-1'>{price}</span>)}</div>
        </div>
    )
}

export default ProductCard