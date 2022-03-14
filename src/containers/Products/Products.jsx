import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading/Loading";
import {useEffect, useState} from "react";
import LoadingError from "../../components/LoadingError/LoadingError";
import ProductCard from "../../components/ProductCard/ProductCard";
import {useAppContext} from "../../hooks/useAppContext";
import {search} from "../../utils/search";

const Products = () => {
    const {data: rawDataProducts, error: errorProducts, loading: loadingProducts, fetchData: fetchProducts} = useFetch()
    const [{searchQuery}, dispatch] = useAppContext()
    const [productsToRender, setProductsToRender] = useState(null)

    const createProducts = (product) => fetchProducts('createCustomer', product)

    useEffect(() => {
        if (!rawDataProducts) {
            fetchProducts('getProducts')
        }
        if (searchQuery && rawDataProducts.length > 0) {
            setProductsToRender(search({array: rawDataProducts, key: searchQuery}).resultArray)
        }
        if (rawDataProducts && !searchQuery) {
            setProductsToRender(rawDataProducts)
        }
    }, [searchQuery, rawDataProducts])

    if (loadingProducts) {
        return <Loading/>
    }

    if (errorProducts) {
        return <LoadingError error={errorProducts}/>
    }

    return (
        <section className="container">
            <div className="col-left gap-24">
                <div className="col-left gap-8 full-width">
                    <p>Fast create</p>
                    <div className="row-left gap-16 full-width">

                    </div>
                </div>
                <div className="col-left gap-8 full-width">
                    <p>Products</p>
                    <div className="col-left gap-8 full-width">
                        {productsToRender &&
                        productsToRender.map(product => <ProductCard key={product.productId} product={product}/>)
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Products







