import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard/ProductCard"
import {BASE_URL} from "../constants/urls"
import { ProductsFeedContainer } from "./styled"

const ProductsFeed = () => {

    const [ products, setProducts ] = useState([])

    useEffect(() => {
        axios.get(`${BASE_URL}/product`)
        .then((res) => {
            console.log(res) // APAGAR DEPOIS
            setProducts(res.data.products)
        })
        .catch((err) => {
            console.log(err)
        })
    })

    const productCards = products.map((product) => {
        return (
            <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
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