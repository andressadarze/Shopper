import React from "react"
import ProductsFeed from "../../screens/ProductsFeed/ProductsFeed"
import OrderForm from "../../screens/OrderForm/OrderForm"
import styled from "styled-components"

export const HomePageContainer = styled.div`
display: flex;
`

const HomePage = (props) => {

    const { cart, addToCart, removeFromCart, deleteFromCart, total, confirmOrder } = props

    return (
        <HomePageContainer>
            <ProductsFeed addToCart={addToCart} />
            <OrderForm
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                deleteFromCart={deleteFromCart}
                total={total}
                confirmOrder={confirmOrder}
            />
        </HomePageContainer>

    )
}

export default HomePage