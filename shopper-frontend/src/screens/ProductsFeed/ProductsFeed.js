import { useContext, useEffect} from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
import { ProductsFeedContainer } from "./styled"
import GlobalStateContext from "../../global/GlobalStateContex"

const ProductsFeed = (props) => {

    const {states, setters, requests} = useContext(GlobalStateContext)

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
        <div>
            <ProductsFeedContainer>
                {productCards}
            </ProductsFeedContainer>
        </div>

    )
}

export default ProductsFeed