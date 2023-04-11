import React, { useContext } from "react"
import OrderProductCard from "../OrderProductCard/OrderProductCard"
import styled from "styled-components"
import GlobalStateContext from "../../global/GlobalStateContex"

export const ContainerSection = styled.section`
    h1 {
        font-size: 1.5em;
        text-align: center;
    }
`

const OrderSummary = () => {

    const { states, setters, requests } = useContext(GlobalStateContext)

    const summary = states.cart.map((product) => {
        return (
            <OrderProductCard 
                key={product.id}
                product={product}
            />
        )
    })

    return (
        <ContainerSection>
            <h1>Resumo do pedido</h1>
            {summary}
            <h2>
                Total: R${states.total.toFixed(2)}
            </h2>
        </ContainerSection>
    )
}

export default OrderSummary