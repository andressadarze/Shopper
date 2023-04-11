import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
import { BASE_URL } from "../../constants/urls"
import { ProductsFeedContainer } from "./styled"
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import {IconButton} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { goToStock } from "../../routes/coordinator"

const ProductsFeed = (props) => {

    const navigate = useNavigate()

    const { addToCart } = props
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`${BASE_URL}/product`)
            .then((res) => {
                setProducts(res.data.products)
            })
            .catch((err) => {
                alert(err.message)
            })
    })

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
        <div>
            <IconButton aria-label="stock" onClick={() => goToStock(navigate)}>
                <Inventory2OutlinedIcon color="primary"/>
            </IconButton>
            <ProductsFeedContainer>
                {productCards}
            </ProductsFeedContainer>
        </div>

    )
}

export default ProductsFeed