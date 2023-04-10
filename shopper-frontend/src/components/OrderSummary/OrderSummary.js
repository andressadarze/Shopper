import React from "react"
import OrderProductCard from "../OrderProductCard/OrderProductCard"
import styled from "styled-components"

export const ContainerSection = styled.section`
    h1 {
        font-size: 1.5em;
        text-align: center;
    }
`

const OrderSummary = (props) => {
    const { cart, addToCart, removeFromCart, deleteFromCart, total} = props

    const summary = cart.map((product) => {
        return (
            <OrderProductCard 
                key={product.id}
                product={product}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                deleteFromCart={deleteFromCart}
            />
        )
    })

    return (
        <ContainerSection>
            <h1>Resumo do pedido</h1>
            {summary}
            <h2>
                Total: R${total.toFixed(2)}
            </h2>
        </ContainerSection>
    )
}

export default OrderSummary