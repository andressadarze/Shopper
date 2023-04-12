import { useContext, useEffect } from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
import { ProductsFeedContainer } from "./styled"
import GlobalStateContext from "../../global/GlobalStateContex"

const ProductsFeed = () => {

    const { states, requests } = useContext(GlobalStateContext)

    useEffect(() => {
        requests.getProducts()
    })

    const productCards = states.products.map((product) => {
        return (
            <ProductCard
                key={product.id}
                product={product}
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