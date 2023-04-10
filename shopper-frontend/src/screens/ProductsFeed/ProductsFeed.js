import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
import {BASE_URL} from "../../constants/urls"
import { ProductsFeedContainer } from "./styled"
// import useRequestData from "../../hooks/useRequestData"

const ProductsFeed = (props) => {

    const { addToCart } = props
    const [ products, setProducts ] = useState([])

    useEffect(() => {
        axios.get(`${BASE_URL}/product`)
        .then((res) => {
            setProducts(res.data.products)
        })
        .catch((err) => {
            console.log(err)
        })
    })

    // const products = useRequestData([], `${BASE_URL}/product`)

    const productCards = products.map((product) => {
        return (
            <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
            />
        )
    })

    return (
        <ProductsFeedContainer>
            {productCards}
        </ProductsFeedContainer>
    )
}

export default ProductsFeed